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
	turnDeadline?: number | null
	mode?: 'classic' | 'limit'
}

interface OnlineGameState {
	board: (string | null)[]
	turn: string | null
	symbol: 'X' | 'O' | null
	roomId: string | null
	winner: string | null
	removingIndex: number | null
	opponentId: string | null
	status: 'idle' | 'searching' | 'found'
	opponentName: string | null
	reconnecting: boolean
	onlineUsers: string[]
	turnDeadline: number | null
	gameOverTimer: ReturnType<typeof setTimeout> | null
	mode: 'classic' | 'limit'
	isDraw: boolean
	setDraw: () => void
	setMode: (mode: 'classic' | 'limit') => void

	setGameOverTimer: (id: ReturnType<typeof setTimeout> | null) => void
	clearGameOverTimer: () => void
	setStatus: (status: 'idle' | 'searching' | 'found') => void
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
		turnDeadline?: number | null,
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
	turnDeadline: null,
	gameOverTimer: null,
	status: 'idle',
	mode: 'limit',
	isDraw: false,
	setDraw: () => set({ isDraw: true }),
	setMode: mode => set({ mode }),
	setStatus: status => {
		console.trace('setStatus', status)
		set({ status })
	},
	setGameOverTimer: id => set({ gameOverTimer: id }),
	clearGameOverTimer: () =>
		set(state => {
			if (state.gameOverTimer) clearTimeout(state.gameOverTimer)
			return { gameOverTimer: null }
		}),
	setOnlineUsers: users => set({ onlineUsers: [...users] }),

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
			mode: data.mode ?? 'limit',
			roomId: data.roomId,
			board: data.board,
			turn: data.turn,
			symbol: player?.symbol ?? null,
			opponentId: opponent?.userId ?? null,
			opponentName: opponent?.username ?? null,
			winner: null,
			removingIndex: null,
			turnDeadline: data.turnDeadline ?? null,
		})
	},

	setWinner: winner => set({ winner }),

	updateBoard: (board, turn, removingIndex, turnDeadline = null) =>
		set({
			board,
			turn,
			removingIndex,
			turnDeadline,
		}),

	reset: () => {
		console.trace('reset called')
		set({
			board: Array(9).fill(null),
			turn: null,
			symbol: null,
			roomId: null,
			winner: null,
			removingIndex: null,
			opponentId: null,
			opponentName: null,
			turnDeadline: null,
			status: 'idle',
			isDraw: false,
		})
	},
}))
