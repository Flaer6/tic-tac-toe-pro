import type { LucideIcon } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'
import type {
	GetUserHistoryQuery,
	GetUserQuery,
} from '../graphql/generated/output'

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
	onPlay?: (nextSquares: (string | null)[], index: number) => void
	xIsNext: boolean
	onCellClick?: (index: number) => void
	resetGame?: () => void
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
	firstName?: string
	lastName?: string
	avatar: string | null
	hasPassword?: boolean
	createdAt: string | number
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
	icon: LucideIcon
	name: string
	href: string
}

export interface ITab {
	icon: LucideIcon
	name: string
	href: string
}

export interface IUpdateProfileResponse {
	firstName?: string
	lastName?: string
	newPassword?: string
	oldPassword?: string
	username?: string
	confirmPassword?: string
}

export interface IUser {
	data?: GetUserQuery['getUser']
	loading?: boolean
}

export interface IHistoryUser {
	data?: GetUserHistoryQuery['getUserHistory']
	userId: string | undefined
}
