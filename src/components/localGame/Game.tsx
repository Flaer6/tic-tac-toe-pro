import { useGameStore } from '../../store/store'
import Board from './Board'

export default function Game() {
	const { history, currentMove, handlePlay, xIsNext, resetGame } =
		useGameStore()
	const currentSquares = history[currentMove]

	return (
		<div className='flex flex-col items-center'>
			<div className='game-board mb-6'>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<button
				className='mt-4 px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-600'
				onClick={resetGame} // Обрабатываем нажатие кнопки сброса
			>
				Новая игра
			</button>
		</div>
	)
}
