import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '../store/auth.store'

export const useCheckAuth = () => {
	const { setAuth, setAccessToken } = useAuthStore()

	return useQuery({
		queryKey: ['checkAuth'],
		queryFn: async () => {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/refresh`,
				null,
				{
					withCredentials: true,
				},
			)
			setAuth(true)
			setAccessToken(res.data.accessToken)
			return res.data
		},

		retry: false,
	})
}
