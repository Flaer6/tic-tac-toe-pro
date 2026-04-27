import { useEffect } from 'react'
import { connectSocket, disconnectSocket } from './shared/socket'
import { useAuthStore } from './store/auth.store'

export const AppInit = () => {
	const { accessToken } = useAuthStore()

	useEffect(() => {
		if (!accessToken) {
			disconnectSocket()
			return
		}

		connectSocket(accessToken)
	}, [accessToken])

	return null
}
