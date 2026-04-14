import type { LucideIcon } from 'lucide-react'
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
	removing?: boolean
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
	identifier: string
	email: string
	password: string
	username: string
}

export interface IAuthResponse {
	message?: string
	accessToken: string
	success: boolean
}

export interface IErrorResponse {
	message: string[]
}

export interface IProfileResponse {
	id: string
	publicId: number
	username: string
	email?: string
	avatar: string | null
}
export interface IInputSearchUser {
	identifier: string
}

export interface IFriendRequest {
	id: string
	fromId: string
	toId: string
	status: FriendStatus
	from?: IProfileResponse
}

export enum FriendStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
}

export interface IDataGameRequest {
	board: (string | null)[]
	turn: string
	removingIndex: number | null
	opponent: string
	roomId: string
	players: {
		userId: string
		symbol: 'X' | 'O'
		username: string
		publicId: string
	}[]

	moves: Record<string, number[]>
	winner: string
}

export interface IMenu {
	icon?: LucideIcon
	name: string
	href: string
}
