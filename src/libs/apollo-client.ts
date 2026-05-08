import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { useAuthStore } from '../store/auth.store'

const authLink = new SetContextLink(prevContext => {
	const token = useAuthStore.getState().accessToken

	return {
		headers: {
			...prevContext.headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_API_URL + '/graphql',
	credentials: 'include',
})

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})
