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
				<div className='absolute top-0 left-0 right-0 bottom-0 z-30 backdrop-blur-sm'>
					<div className={styles.winner}>
						<span>
							Победитель:{' '}
							<span
								className={cn('X', {
									['O']: winner == 'O',
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
				</div>
			) : (
				''
			)}

			<div className='mb-3 p-2 text-7xl font-semibold flex justify-between gap-4 items-center bg-neutral-900 bg-opacity-60 border-[5px] border-neutral-900 border-opacity-50 rounded-xl'>
				<div className={cn(status == 'X' ? 'X' : 'X-off')}>X</div>
				<div className={cn(status == 'O' ? 'O' : 'O-off')}>O</div>
			</div>
			<div className={styles.board}>
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
