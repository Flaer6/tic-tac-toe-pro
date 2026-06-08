import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	Observable, // Нужен для создания очереди
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error' // Добавился этот импорт
import { getValidToken } from '../shared/api/refresh'
import { useAuthStore } from '../store/auth.store'

const authLink = setContext((_, { headers }) => {
	const token = useAuthStore.getState().accessToken

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	}
})

// Добавляем перехватчик 401 ошибок для GraphQL
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
	if (graphQLErrors) {
		// Изменили let на const, так как err внутри цикла не переназначается
		for (const err of graphQLErrors) {
			const isUnauthorized =
				err.extensions?.code === 'UNAUTHORIZED' ||
				err.message === 'Unauthorized'

			if (isUnauthorized) {
				return new Observable(observer => {
					getValidToken()
						.then(newToken => {
							operation.setContext(({ headers = {} }) => ({
								headers: {
									...headers,
									Authorization: `Bearer ${newToken}`,
								},
							}))

							const subscriber = {
								next: observer.next.bind(observer),
								error: observer.error.bind(observer),
								complete: observer.complete.bind(observer),
							}

							forward(operation).subscribe(subscriber)
						})
						.catch(error => {
							observer.error(error)
						})
				})
			}
		}
	}
})

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_API_URL + '/graphql',
	credentials: 'include',
})

export const client = new ApolloClient({
	// errorLink ставим ПЕРВЫМ, чтобы он успевал ловить ошибки от бэкенда
	link: ApolloLink.from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					getMe: {
						merge: false,
					},
				},
			},
		},
	}),
})
