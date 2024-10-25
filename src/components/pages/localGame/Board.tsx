import cn from 'clsx'
import { useGameStore } from '../../../store/store'
import type { BoardProps } from '../../../types/types'
import Square from './Square'
import calculateWinner from './Winner'
import styles from './localGame.module.scss'

export default function Board({ squares, onPlay, xIsNext }: BoardProps) {
	const { resetGame } = useGameStore()
	function handleClick(i: number) {
		if (calculateWinner(squares) || squares[i]) {
			return
		}
		const nextSquares = squares.slice()
		nextSquares[i] = xIsNext ? 'X' : 'O'
		onPlay(nextSquares, i)
	}

	const winner = calculateWinner(squares)
	const status = `${xIsNext ? 'X' : 'O'}`

	return (
		<>
			{winner ? (
				<div className={styles.winner}>
					<span>
						Победитель:{' '}
						<span
							className={cn({
								['text-rose-500']: winner == 'O',
							})}
						>
							{winner}
						</span>
					</span>
					<button
						className='mt-4 px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600'
						onClick={resetGame}
					>
						Новая игра
					</button>
				</div>
			) : (
				''
			)}
			<div className='mb-2 text-3xl font-semibold'>
				Ход:{' '}
				<span
					className={cn({
						['text-rose-800']: status == 'O',
					})}
				>
					{status}
				</span>
			</div>
			<div className='grid grid-cols-3'>
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
