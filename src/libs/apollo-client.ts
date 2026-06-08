import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAuthStore } from '../store/auth.store'

const authLink = setContext((_, { headers }) => {
	const token = useAuthStore.getState().accessToken

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : undefined,
		},
	}
})

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_API_URL + '/graphql',
	credentials: 'include',
})

export const client = new ApolloClient({
	link: ApolloLink.from([authLink, httpLink]),
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
