import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { socket } from '../shared/socket'
import { useOnlineGameStore } from '../store/onlineGame.store'
import type { IDataGameRequest } from '../types/types'
import { useGetProfile } from './useGetUser'

type Status = 'idle' | 'searching' | 'found'

export const useGameSocket = () => {
	const { setGame, updateBoard, setWinner, setReconnecting, reset } =
		useOnlineGameStore()

	const [status, setStatus] = useState<Status>('idle')
	const { data: user } = useGetProfile()

	/* =========================
		 RECONNECT
	========================= */

	useEffect(() => {
		const handleDisconnect = () => {
			setReconnecting(true)
		}

		const handleConnect = () => {
			setReconnecting(false)

			// восстанавливаем игру только если были в игре
			socket.emit('restore_game')
		}

		socket.on('disconnect', handleDisconnect)
		socket.on('connect', handleConnect)

		return () => {
			socket.off('disconnect', handleDisconnect)
			socket.off('connect', handleConnect)
		}
	}, [])

	/* =========================
		 GAME EVENTS
	========================= */

	useEffect(() => {
		if (!user) return
		socket.emit('restore_game')

		const handleSearching = () => {
			setStatus('searching')
		}

		const handleGameFound = (data: IDataGameRequest) => {
			console.log('GAME FOUND:', data)
			console.log('USER ID:', user.id)
			setGame(data, String(user.id))
			setStatus('found')
		}

		const handleMove = (data: IDataGameRequest) => {
			updateBoard(data.board, data.turn, data.removingIndex)
		}

		const handleOpponentLeft = () => {
			toast('Соперник вышел ❌')
			reset()
			setStatus('idle')
		}

		const handleGameOver = (data: IDataGameRequest) => {
			updateBoard(data.board, data.turn, data.removingIndex)
			setWinner(data.winner)
		}

		const handleCancelEvent = () => {
			setStatus(prev => {
				if (prev !== 'searching') return prev
				return 'idle'
			})
		}

		socket.on('searching_game', handleSearching)
		socket.on('game_found', handleGameFound)
		socket.on('move_made', handleMove)
		socket.on('opponent_left', handleOpponentLeft)
		socket.on('game_over', handleGameOver)
		socket.on('search_canceled', handleCancelEvent)

		return () => {
			socket.off('searching_game', handleSearching)
			socket.off('game_found', handleGameFound)
			socket.off('move_made', handleMove)
			socket.off('opponent_left', handleOpponentLeft)
			socket.off('game_over', handleGameOver)
			socket.off('search_canceled', handleCancelEvent)
		}
	}, [user])

	/* =========================
		 FIND GAME
	========================= */

	const handleFind = () => {
		if (!socket.connected) return

		reset()
		setStatus('searching')

		socket.emit('find_game')
	}

	/* =========================
		 CANCEL SEARCH
	========================= */

	const handleCancel = () => {
		if (!socket.connected) return

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
