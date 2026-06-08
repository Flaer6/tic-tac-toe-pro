import { useEffect } from 'react'
import { client } from '../libs/apollo-client'
import { getValidToken } from '../shared/api/refresh'
import { useAuthStore } from '../store/auth.store'

export const useAuthBootstrap = () => {
	const setStatus = useAuthStore(s => s.setStatus)
	const logout = useAuthStore(s => s.logout)

	useEffect(() => {
		const init = async () => {
			setStatus('loading')

			try {
				// Используем общую функцию getValidToken.
				// Она сама сделает запрос, обновит Zustand и разрулит очереди, если они возникнут.
				await getValidToken()

				setStatus('authenticated') // Не забудьте перевести статус в успех
			} catch (e) {
				// Если рефреш не удался (нет куки или она протухла)
				logout()
				setStatus('unauthenticated') // Устанавливаем статус неавторизованного пользователя

				// Очищаем кэш Apollo при неудачной авторизации,
				// используя безопасный clearStore вместо resetStore
				await client
					.clearStore()
					.catch(err => console.error('Ошибка очистки кэша:', err))
			}
		}

		init()
	}, [logout, setStatus]) // Добавляем зависимости для соблюдения правил React Hooks
}
