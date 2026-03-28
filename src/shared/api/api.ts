import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (error.response?.status === 401) {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{
						withCredentials: true,
					},
				)
				localStorage.setItem('accessToken', response.data.accessToken)
				return api(originalRequest)
			} catch (error) {
				console.log('НЕ АВТОРИЗОВАН', error)
			}
		}
	},
)
