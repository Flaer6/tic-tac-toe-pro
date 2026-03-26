import type { HTMLAttributes, ReactNode } from 'react'

export interface GameState {
	history: (string | null)[][]
	currentMove: number
	xIsNext: boolean
	xMoves: number[]
	oMoves: number[]
	handlePlay: (nextSquares: (string | null)[], index: number) => void
	jumpTo: (nextMove: number) => void
	resetGame: () => void
}

export interface SquareProps {
	value: string | null
	onSquareClick: () => void
}

export interface BoardProps {
	squares: (string | null)[]
	onPlay: (nextSquares: (string | null)[], index: number) => void
	xIsNext: boolean
}

export interface IProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
	to: string
	soon?: boolean
}

export interface IInputAuth {
	email: string
	password: string
	username: string
}

export interface IAuthResponse {
	accessToken: string
}
