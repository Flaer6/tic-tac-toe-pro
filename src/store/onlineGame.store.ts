import { create } from 'zustand'

interface IGame {
	opponent: string
	roomId: string
	players: {
		userId: string
		symbol: 'X' | 'O'
		username: string
		publicId: string
	}[]
	board: (string | null)[]
	turn: string
	moves: Record<string, number[]>
	winner?: string | null
}

interface OnlineGameState {
	board: (string | null)[]
	turn: string | null
	symbol: 'X' | 'O' | null
	roomId: string | null
	winner: string | null
	removingIndex: number | null
	opponentId: string | null
	opponentName: string | null
	reconnecting: boolean
	onlineUsers: string[]
	setOnlineUsers: (users: string[]) => void
	addOnlineUser: (userId: string) => void
	removeOnlineUser: (userId: string) => void

	setReconnecting: (value: boolean) => void
	setGame: (data: IGame, userId: string) => void
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
	opponentId: null,
	opponentName: null,
	reconnecting: false,
	onlineUsers: [],

	setOnlineUsers: users =>
		set({
			onlineUsers: [...users],
		}),

	addOnlineUser: userId =>
		set(state => ({
			onlineUsers: [...new Set([...state.onlineUsers, userId])],
		})),

	removeOnlineUser: userId =>
		set(state => ({
			onlineUsers: state.onlineUsers.filter(id => id !== userId),
		})),
	setReconnecting: value => set({ reconnecting: value }),

	setGame: (data, userId) => {
		if (data.winner) return

		const player = data.players.find(p => p.userId === userId)
		const opponent = data.players.find(p => p.userId !== userId)

		set({
			roomId: data.roomId,
			board: data.board,
			turn: data.turn,
			symbol: player?.symbol ?? null,
			opponentId: opponent?.userId ?? null,
			opponentName: opponent?.username ?? null,
			winner: null,
			removingIndex: null,
		})
	},

	setWinner: winner => set({ winner }),

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
			removingIndex: null,
			opponentId: null,
			opponentName: null,
		}),
}))
