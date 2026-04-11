import { useEffect, useState } from 'react'

import { socket } from '../shared/socket'
import { useOnlineGameStore } from '../store/onlineGame.store'
import type { IDataGameRequest } from '../types/types'
import { useGetProfile } from './useGetUser'

type Status = 'idle' | 'searching' | 'found'

export const useGameSocket = () => {
	const { setGame, updateBoard, setWinner } = useOnlineGameStore()
	const [status, setStatus] = useState<Status>('idle')
	const { data: user } = useGetProfile()

	useEffect(() => {
		if (!user || !socket.connected) return

		const handleSearching = () => {
			setStatus('searching')
		}

		const handleGameFound = (data: IDataGameRequest) => {
			setGame(data, user.id)
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
