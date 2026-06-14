import { create } from 'zustand'

interface ClassicGameState {
	history: (string | null)[][]
	currentMove: number
	xIsNext: boolean
	handlePlay: (nextSquares: (string | null)[]) => void
	resetGame: () => void
}

export const useClassicGameStore = create<ClassicGameState>((set, get) => ({
	history: [Array(9).fill(null)],
	currentMove: 0,
	xIsNext: true,

	handlePlay: nextSquares => {
		const { history, currentMove } = get()
		set({
			history: [...history.slice(0, currentMove + 1), nextSquares],
			currentMove: currentMove + 1,
			xIsNext: !get().xIsNext,
		})
	},

	resetGame: () =>
		set({
			history: [Array(9).fill(null)],
			currentMove: 0,
			xIsNext: true,
		}),
}))
