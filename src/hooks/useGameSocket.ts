import { useEffect, useState } from 'react'

import { socket } from '../shared/socket'
import { useOnlineGameStore } from '../store/onlineGame.store'
import type { IDataGameRequest } from '../types/types'
import { useGetProfile } from './useGetUser'

type Status = 'idle' | 'searching' | 'found'

export const useGameSocket = () => {
	const { setGame, updateBoard, setWinner, setReconnecting } =
		useOnlineGameStore()
	const [status, setStatus] = useState<Status>('idle')
	const { data: user } = useGetProfile()

	useEffect(() => {
		const handleDisconnect = () => {
			console.log('disconnect')
			setReconnecting(true)
		}

		const handleConnect = () => {
			console.log('reconnect')
			setReconnecting(false)
			socket.emit('restore_game')
		}

		socket.on('disconnect', handleDisconnect)
		socket.on('connect', handleConnect)

		return () => {
			socket.off('disconnect', handleDisconnect)
			socket.off('connect', handleConnect)
		}
	}, [])

	useEffect(() => {
		if (!user) return
		socket.emit('restore_game')
		const handleSearching = () => {
			setStatus('searching')
		}

		const handleGameFound = (data: IDataGameRequest) => {
			console.log('GAME FOUND DATA:', data)
			setGame(data, String(user.id))
			setStatus('found')
		}

		const handleMove = (data: IDataGameRequest) => {
			updateBoard(data.board, data.turn, data.removingIndex)
		}

		const handleOpponentLeft = () => {
			alert('Соперник покинул игру')
			setStatus('idle')
		}

		const handleGameOver = (data: IDataGameRequest) => {
			updateBoard(data.board, data.turn, data.removingIndex)
			setWinner(data.winner)
		}

		socket.on('searching_game', handleSearching)
		socket.on('game_found', handleGameFound)
		socket.on('move_made', handleMove)
		socket.on('opponent_left', handleOpponentLeft)
		socket.on('game_over', handleGameOver)

		return () => {
			socket.off('searching_game', handleSearching)
			socket.off('game_found', handleGameFound)
			socket.off('move_made', handleMove)
			socket.off('opponent_left', handleOpponentLeft)
			socket.off('game_over', handleGameOver)
		}
	}, [user])

	const handleFind = () => {
		if (!socket.connected) {
			console.log('socket not connected')
			return
		}

		socket.emit('find_game')
	}

	const handleCancel = () => {
		if (!socket.connected) return

		socket.emit('cancel_find_game')
		setStatus('idle')
	}

	return {
		handleCancel,
		handleFind,
		status,
	}
}
