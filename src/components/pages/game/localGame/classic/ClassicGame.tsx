// pages/game/localGame/classic/ClassicGame.tsx
import { useClassicGameStore } from '../../../../../store/classicGame.store'
import Board from '../limitMove/Board'

export default function ClassicGame() {
	const { history, currentMove, xIsNext, handlePlay, resetGame } =
		useClassicGameStore()
	const currentSquares = history[currentMove]

	return (
		<div className='flex flex-col items-center justify-center w-full h-auto'>
			<Board
				xIsNext={xIsNext}
				squares={currentSquares}
				onPlay={squares => handlePlay(squares)}
				resetGame={resetGame}
			/>
		</div>
	)
}
