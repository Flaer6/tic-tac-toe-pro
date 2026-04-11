import axios from 'axios'
import { useAuthStore } from '../../store/auth.store'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

let isRefreshing = false
let refreshQueue: ((token: string) => void)[] = []

api.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

api.interceptors.response.use(
	res => res,
	async error => {
		const originalRequest = error.config

		const isAuthRoute =
			originalRequest?.url?.includes('/auth/refresh') ||
			originalRequest?.url?.includes('/auth/login') ||
			originalRequest?.url?.includes('/auth/register') ||
			originalRequest?.url?.includes('/auth/logout')

		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry &&
			!isAuthRoute
		) {
			originalRequest._retry = true

			if (isRefreshing) {
				return new Promise(resolve => {
					refreshQueue.push((token: string) => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						resolve(api(originalRequest))
					})
				})
			}

			isRefreshing = true

			try {
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{},
					{ withCredentials: true },
				)

				const newToken = res.data.accessToken

				const { setAccessToken, setAuth } = useAuthStore.getState()
				setAccessToken(newToken)
				setAuth(true)

				useAuthStore.getState().setAccessToken(newToken)

				refreshQueue.forEach(cb => cb(newToken))
				refreshQueue = []

				originalRequest.headers.Authorization = `Bearer ${newToken}`

				return api(originalRequest)
			} catch (err) {
				const { logout } = useAuthStore.getState()
				logout()
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	},
)
