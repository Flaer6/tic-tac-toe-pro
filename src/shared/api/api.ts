import axios from 'axios'
import { useAuthStore } from '../../store/auth.store'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

let isRefreshing = false
let refreshQueue: ((token: string) => void)[] = []

api.interceptors.response.use(
	res => res,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true

			if (isRefreshing) {
				return new Promise(resolve => {
					refreshQueue.push((token: string) => {
						originalRequest.headers = {
							...originalRequest.headers,
							Authorization: `Bearer ${token}`,
						}

						resolve(api(originalRequest))
					})
				})
			}

			isRefreshing = true

			try {
				const res = await api.post('/auth/refresh')

				const newToken = res.data.accessToken

				useAuthStore.getState().setAccessToken(newToken)

				refreshQueue.forEach(cb => cb(newToken))
				refreshQueue = []

				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newToken}`,
				}

				return api(originalRequest)
			} catch (err) {
				useAuthStore.getState().logout()
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	},
)
