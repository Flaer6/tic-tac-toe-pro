import { BoardProps } from '../../../types/types'
import Square from './Square'
import calculateWinner from './Winner'

export default function Board({ squares, onPlay, xIsNext }: BoardProps) {
	function handleClick(i: number) {
		if (calculateWinner(squares) || squares[i]) {
			return
		}
		const nextSquares = squares.slice()
		nextSquares[i] = xIsNext ? 'X' : 'O'
		onPlay(nextSquares, i)
	}

	const winner = calculateWinner(squares)
	const status = winner
		? `Winner: ${winner}`
		: `Next player: ${xIsNext ? 'X' : 'O'}`

	return (
		<>
			<div className='mb-4 text-lg font-semibold'>{status}</div>
			<div className='grid grid-cols-3 gap-2'>
				{squares.map((square, index) => (
					<Square
						key={index}
						value={square}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>
		</>
	)
}
