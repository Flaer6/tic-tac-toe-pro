import { useEffect, useState } from 'react'
import Board from '../localGame/standard/Board'
import calculateWinner from '../localGame/standard/Winner'
import { getBotMove } from './bot'

type Player = 'X' | 'O' | ''

type Move = {
	index: number
	player: Player
}

export default function GameVsAI() {
	const [squares, setSquares] = useState<Player[]>(Array(9).fill(''))
	const [history, setHistory] = useState<Move[]>([])
	const [xIsNext, setXIsNext] = useState(true)

	const winner = calculateWinner(squares)

	// ⚙️ твоя механика 3 хода
	function applyMove(
		board: Player[],
		history: Move[],
		index: number,
		player: Player,
	) {
		const newBoard = [...board]
		const newHistory = [...history]

		newBoard[index] = player
		newHistory.push({ index, player })

		const playerMoves = newHistory.filter(m => m.player === player)

		if (playerMoves.length > 3) {
			const removed = playerMoves[0]

			newBoard[removed.index] = ''

			const idx = newHistory.findIndex(
				m => m.index === removed.index && m.player === player,
			)

			if (idx !== -1) newHistory.splice(idx, 1)
		}

		return { board: newBoard, history: newHistory }
	}

	// 👤 ход игрока
	function handlePlayerMove(i: number) {
		if (squares[i] || winner || !xIsNext) return

		const result = applyMove(squares, history, i, 'X')

		setSquares(result.board)
		setHistory(result.history)
		setXIsNext(false)
	}

	// 🤖 ход бота
	useEffect(() => {
		if (winner) return
		if (xIsNext) return

		const timer = setTimeout(() => {
			const move = getBotMove(squares)

			const result = applyMove(squares, history, move, 'O')

			setSquares(result.board)
			setHistory(result.history)
			setXIsNext(true)
		}, 350)

		return () => clearTimeout(timer)
	}, [squares, history, xIsNext, winner])

	function reset() {
		setSquares(Array(9).fill(''))
		setHistory([])
		setXIsNext(true)
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-white'>
			<h1 className='text-2xl font-bold mb-4'>Play vs AI 🤖</h1>

			<Board
				squares={squares}
				onCellClick={handlePlayerMove}
				xIsNext={xIsNext}
				resetGame={reset}
			/>

			<div className='mt-4 text-lg'>
				{winner
					? `🏆 Winner: ${winner}`
					: xIsNext
						? 'Your turn (X)'
						: 'AI thinking...'}
			</div>

			<button onClick={reset} className='mt-4 px-4 py-2 bg-red-500 rounded'>
				Reset
			</button>
		</div>
	)
}
