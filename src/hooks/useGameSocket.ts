import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { socket } from '../shared/socket'
import { useOnlineGameStore } from '../store/onlineGame.store'
import type { IDataGameRequest } from '../types/types'

type Status = 'idle' | 'searching' | 'found'

export const useGameSocket = () => {
	const {
		setGame,
		updateBoard,
		setWinner,
		setReconnecting,
		reset,
		setOnlineUsers,
		addOnlineUser,
		removeOnlineUser,
	} = useOnlineGameStore()

	const [status, setStatus] = useState<Status>('idle')

	/* =========================
		HELPERS
	========================= */

	const getUserIdFromToken = () => {
		try {
			const auth = socket.auth as { token?: string }

			if (!auth?.token) return null

			const payload = JSON.parse(atob(auth.token.split('.')[1]))

			return payload.id ?? null
		} catch {
			return null
		}
	}

	const applyGameState = (data: IDataGameRequest) => {
		const userId = getUserIdFromToken()

		if (!userId) {
			console.log('NO USER ID')
			return
		}

		setGame(data, userId)
		setStatus('found')
	}

	/* =========================
		ONLINE USERS
	========================= */

	useEffect(() => {
		const handleOnlineUsers = (users: string[]) => {
			setOnlineUsers(users)
		}

		const handleUserOnline = (userId: string) => {
			addOnlineUser(userId)
		}

		const handleUserOffline = (userId: string) => {
			removeOnlineUser(userId)
		}

		socket.on('online_users', handleOnlineUsers)
		socket.on('user_online', handleUserOnline)
		socket.on('user_offline', handleUserOffline)

		if (socket.connected) {
			socket.emit('get_online_users')
		}

		return () => {
			socket.off('online_users', handleOnlineUsers)
			socket.off('user_online', handleUserOnline)
			socket.off('user_offline', handleUserOffline)
		}
	}, [setOnlineUsers, addOnlineUser, removeOnlineUser])

	/* =========================
		RECONNECT
	========================= */

	useEffect(() => {
		const handleDisconnect = () => {
			setReconnecting(true)
		}

		const handleConnect = () => {
			setReconnecting(false)

			socket.emit('restore_game')
			socket.emit('get_online_users')
		}

		socket.on('disconnect', handleDisconnect)
		socket.on('connect', handleConnect)

		return () => {
			socket.off('disconnect', handleDisconnect)
			socket.off('connect', handleConnect)
		}
	}, [setReconnecting])

	/* =========================
		RESTORE ON MOUNT
	========================= */

	useEffect(() => {
		if (socket.connected) {
			socket.emit('restore_game')
		}
	}, [])

	/* =========================
		GAME EVENTS
	========================= */

	useEffect(() => {
		const handleSearching = () => {
			setStatus('searching')
		}

		const handleGameFound = (data: IDataGameRequest) => {
			applyGameState(data)
		}

		const handleGameRestored = (data: IDataGameRequest) => {
			applyGameState(data)
		}

		const handleMove = (data: IDataGameRequest) => {
			updateBoard(data.board, data.turn, data.removingIndex)
		}

		const handleOpponentLeft = () => {
			toast('Соперник вышел')
			reset()
			setStatus('idle')
		}

		const handleGameOver = (data: IDataGameRequest) => {
			updateBoard(data.board, data.turn, data.removingIndex)
			setWinner(data.winner)

			setTimeout(() => {
				reset()
				setStatus('idle')
			}, 5000)
		}

		const handleCancelEvent = () => {
			setStatus(prev => (prev === 'searching' ? 'idle' : prev))
		}

		socket.on('searching_game', handleSearching)
		socket.on('game_found', handleGameFound)
		socket.on('game_restored', handleGameRestored)
		socket.on('move_made', handleMove)
		socket.on('opponent_left', handleOpponentLeft)
		socket.on('game_over', handleGameOver)
		socket.on('search_canceled', handleCancelEvent)

		return () => {
			socket.off('searching_game', handleSearching)
			socket.off('game_found', handleGameFound)
			socket.off('game_restored', handleGameRestored)
			socket.off('move_made', handleMove)
			socket.off('opponent_left', handleOpponentLeft)
			socket.off('game_over', handleGameOver)
			socket.off('search_canceled', handleCancelEvent)
		}
	}, [reset, setGame, setWinner, updateBoard])

	/* =========================
		ACTIONS
	========================= */

	const handleFind = () => {
		if (!socket.connected) {
			console.log('SOCKET NOT CONNECTED')
			return
		}

		if (status !== 'found') reset()

		setStatus('searching')
		socket.emit('find_game')
	}

	const handleCancel = () => {
		if (!socket.connected) {
			console.log('SOCKET NOT CONNECTED')
			return
		}

		socket.emit('cancel_find_game')
		reset()
		setStatus('idle')
	}

	return {
		handleCancel,
		handleFind,
		status,
		setStatus,
	}
}
