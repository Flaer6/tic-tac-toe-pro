import { create } from 'zustand'

interface OnlineGameState {
	board: (string | null)[]
	turn: string | null
	symbol: 'X' | 'O' | null
	roomId: string | null
	winner: string | null
	removingIndex: number | null

	setGame: (data: any, userId?: string) => void
	setWinner: (winner: string) => void
	updateBoard: (
		board: (string | null)[],
		turn: string,
		removingIndex: number | null,
	) => void
	reset: () => void
}

export const useOnlineGameStore = create<OnlineGameState>(set => ({
	board: Array(9).fill(null),
	turn: null,
	symbol: null,
	roomId: null,
	winner: null,
	removingIndex: null,

	setGame: (data, userId) => {
		const player = data.players.find((p: any) => p.userId === userId)

		set({
			roomId: data.roomId,
			board: Array(9).fill(null),
			turn: data.players[0].userId, // X ходит первым
			symbol: player?.symbol ?? null,
		})
	},
	setWinner: winner => {
		set({
			winner,
		})
	},
	updateBoard: (board, turn, removingIndex) =>
		set({
			board,
			turn,
			removingIndex,
		}),

	reset: () =>
		set({
			board: Array(9).fill(null),
			turn: null,
			symbol: null,
			roomId: null,
			winner: null,
		}),
}))
