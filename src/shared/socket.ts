import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_API_URL, {
	withCredentials: true,
	autoConnect: false,
})

// подключение с токеном
export const connectSocket = (token: string) => {
	if (!token) return

	socket.auth = { token }

	if (!socket.connected) {
		socket.connect()
	}
}

// отключение
export const disconnectSocket = () => {
	if (socket.connected) {
		socket.disconnect()
	}
}
