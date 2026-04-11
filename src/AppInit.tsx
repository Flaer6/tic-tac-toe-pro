import { useEffect } from 'react'
import { connectSocket, disconnectSocket } from './shared/socket'
import { useAuthStore } from './store/auth.store'

export const AppInit = () => {
	const { accessToken } = useAuthStore()

	useEffect(() => {
		if (accessToken) {
			connectSocket(accessToken)
		} else {
			disconnectSocket()
		}
	}, [accessToken])

	return null
}
