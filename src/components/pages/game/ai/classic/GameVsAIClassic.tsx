import { useEffect, useState } from 'react'
import Board from '../../localGame/limitMove/Board'
import calculateWinner from '../../localGame/limitMove/Winner'
import { getBotMove } from '../bot'

type Player = 'X' | 'O' | ''

export default function GameVsAIClassic() {
	const [squares, setSquares] = useState<Player[]>(Array(9).fill(''))
	const [xIsNext, setXIsNext] = useState(true)

	const winner = calculateWinner(squares)

	function handlePlayerMove(i: number) {
		if (squares[i] || winner || !xIsNext) return
		const newSquares = [...squares]
		newSquares[i] = 'X'
		setSquares(newSquares)
		setXIsNext(false)
	}

	useEffect(() => {
		if (winner || xIsNext) return
		const timer = setTimeout(() => {
			const move = getBotMove(squares)
			const newSquares = [...squares]
			newSquares[move] = 'O'
			setSquares(newSquares)
			setXIsNext(true)
		}, 350)
		return () => clearTimeout(timer)
	}, [squares, xIsNext, winner])

	function reset() {
		setSquares(Array(9).fill(''))
		setXIsNext(true)
	}

	return (
		<Board
			squares={squares}
			onCellClick={handlePlayerMove}
			xIsNext={xIsNext}
			resetGame={reset}
		/>
	)
}
