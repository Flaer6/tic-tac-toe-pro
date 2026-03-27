import axios from 'axios'
import { useAuthStore } from '../../store/auth.store'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

api.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

let isRefreshing = false
let queue: ((token: string) => void)[] = []

api.interceptors.response.use(
	res => res,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			// если refresh уже идёт — ждём
			if (isRefreshing) {
				return new Promise(resolve => {
					queue.push((token: string) => {
						originalRequest.headers['Authorization'] = `Bearer ${token}`
						resolve(api(originalRequest))
					})
				})
			}

			isRefreshing = true

			try {
				const { data } = await api.post(
					'/auth/refresh',
					{},
					{ withCredentials: true },
				)

				const newToken = data.accessToken

				useAuthStore.getState().setAccessToken(newToken)

				// выполняем очередь
				queue.forEach(cb => cb(newToken))
				queue = []

				originalRequest.headers['Authorization'] = `Bearer ${newToken}`

				return api(originalRequest)
			} catch (err) {
				useAuthStore.getState().setAccessToken(null)
				queue = []
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	},
)
