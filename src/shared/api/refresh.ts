import axios from 'axios'
import { useAuthStore } from '../../store/auth.store'

let isRefreshing = false
let refreshQueue: ((token: string) => void)[] = []

const refreshApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

export const getValidToken = (): Promise<string> => {
	// Экзекутор теперь синхронный, как и должно быть
	return new Promise((resolve, reject) => {
		// 1. Если обновление уже запущено, просто встаем в очередь
		if (isRefreshing) {
			refreshQueue.push((token: string) => resolve(token))
			return
		}

		isRefreshing = true

		// 2. Делаем запрос без использования async/await внутри экзекутора
		refreshApi
			.post('/auth/refresh')
			.then(res => {
				const newToken = res.data.accessToken

				// 3. Сохраняем в Zustand стор
				useAuthStore.getState().setAccessToken(newToken)

				// 4. Раздаем новый токен всем, кто ожидал в очереди
				refreshQueue.forEach(cb => cb(newToken))
				refreshQueue = []

				resolve(newToken)
			})
			.catch(err => {
				// 5. Если рефреш-токен протух, очищаем всё и разлогиниваем пользователя
				refreshQueue = []
				useAuthStore.getState().logout()
				reject(err)
			})
			.finally(() => {
				isRefreshing = false
			})
	})
}
