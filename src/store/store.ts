import { create } from 'zustand'
import applyMoveLimit from '../components/pages/localGame/MoveLimit'
import type { GameState } from '../types/types'

export const useGameStore = create<GameState>((set, get) => ({
	history: [Array(9).fill(null)],
	currentMove: 0,
	xIsNext: true,
	xMoves: [],
	oMoves: [],

	handlePlay: (nextSquares: (string | null)[], index: number) => {
		const { history, currentMove, xIsNext, xMoves, oMoves } = get()

		// Обновляем список ходов X или O
		const newMoves = xIsNext ? [...xMoves, index] : [...oMoves, index]
		const updatedSquares = applyMoveLimit(
			nextSquares,
			newMoves,
			xIsNext ? 'X' : 'O'
		)

		// Обновляем массив ходов после удаления старых
		set({
			history: [...history.slice(0, currentMove + 1), updatedSquares],
			currentMove: currentMove + 1,
			xIsNext: !xIsNext,
			xMoves: xIsNext ? newMoves.slice(-3) : xMoves, // Оставляем только последние 3 хода X
			oMoves: !xIsNext ? newMoves.slice(-3) : oMoves, // Оставляем только последние 3 хода O
		})
	},

	jumpTo: (nextMove: number) => {
		set({
			currentMove: nextMove,
			xIsNext: nextMove % 2 === 0,
		})
	},

	resetGame: () => {
		set({
			history: [Array(9).fill(null)],
			currentMove: 0,
			xIsNext: true,
			xMoves: [],
			oMoves: [],
		})
	},
}))
