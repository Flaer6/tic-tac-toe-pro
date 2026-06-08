import axios from 'axios'

import { useAuthStore } from '../../store/auth.store'
import { getValidToken } from './refresh'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

// Добавляем accessToken во все запросы
api.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// Перехватываем 401 ошибку
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

			try {
				// Запрашиваем новый токен через единый сервис очереди
				const newToken = await getValidToken()

				// Повторяем упавший запрос с новым токеном
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newToken}`,
				}

				return api(originalRequest)
			} catch (err) {
				return Promise.reject(err)
			}
		}

		return Promise.reject(error)
	},
)
