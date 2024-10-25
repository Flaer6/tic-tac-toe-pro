import { Link } from 'react-router-dom'
import { useGameStore } from '../../../store/store'
import Board from './Board'

export default function Game() {
	const { history, currentMove, handlePlay, xIsNext, resetGame } =
		useGameStore()
	const currentSquares = history[currentMove]

	return (
		<div className='flex items-center justify-center px-2'>
			<div className='flex flex-col items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-auto'>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='flex flex-col gap-3 items-center'>
				<button
					className='mt-3 px-6 py-2 text-2xl bg-red-500 text-white font-bold hover:bg-red-600 absolute bottom-0 left-0'
					onClick={resetGame}
				>
					Новая игра
				</button>
				<Link to='/' className='text-4xl absolute bottom-0 right-0'>
					Назад
				</Link>
			</div>
		</div>
	)
}
