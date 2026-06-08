import { useEffect } from 'react'
import { useAuthBootstrap } from './hooks/useCheckAuth'
import { connectSocket, disconnectSocket } from './shared/socket'
import { useAuthStore } from './store/auth.store'

export const AppInit = () => {
	// Запускаем инициализацию авторизации (тихий рефреш)
	useAuthBootstrap()

	// Берем и токен, и статус приложения
	const accessToken = useAuthStore(s => s.accessToken)
	const status = useAuthStore(s => s.status)

	useEffect(() => {
		// 1. Если приложение еще загружается (идет проверка кук), ничего не делаем
		if (status === 'loading') return

		// 2. Если токена нет, гарантированно отключаем сокет
		if (!accessToken) {
			disconnectSocket()
			return
		}

		// 3. Если токен есть и статус позволяет — подключаемся
		connectSocket(accessToken)

		// 4. Cleanup-функция: если компонент размонтируется или токен изменится,
		// сначала корректно закрываем старый коннект
		return () => {
			disconnectSocket()
		}
	}, [accessToken, status]) // Добавили status в зависимости

	return null
}
