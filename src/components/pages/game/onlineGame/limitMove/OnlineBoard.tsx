import cn from 'clsx'
import { m } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
	useGetMeQuery,
	useGetUserQuery,
} from '../../../../../graphql/generated/output'
import { socket } from '../../../../../shared/socket'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'
import { AdminLabel } from '../../../../ui/status/AdminLabel'

import styles from '../../localGame/limitMove/localGame.module.css'
import Square from '../../localGame/limitMove/Square'
import { WinnerModal } from './WinnerModal'

const TURN_SECONDS = 20

function getDisplayName(
	firstName?: string | null,
	lastName?: string | null,
	username?: string | null,
	fallback = 'Игрок',
) {
	if (firstName || lastName) {
		return `${firstName ?? ''} ${lastName ?? ''}`.trim()
	}
	return username ?? fallback
}

function useTurnCountdown(turnDeadline: number | null) {
	const [timeLeft, setTimeLeft] = useState(TURN_SECONDS)

	useEffect(() => {
		if (!turnDeadline) {
			setTimeLeft(TURN_SECONDS)
			return
		}

		const tick = () => {
			const left = Math.max(0, Math.ceil((turnDeadline - Date.now()) / 1000))
			setTimeLeft(left)
		}

		tick()
		const id = setInterval(tick, 200)
		return () => clearInterval(id)
	}, [turnDeadline])

	return timeLeft
}

export function OnlineBoard() {
	const {
		board,
		turn,
		symbol,
		removingIndex,
		opponentName,
		reconnecting,
		opponentId,
		roomId,
		turnDeadline,
	} = useOnlineGameStore()

	const { data: opponentData } = useGetUserQuery({
		variables: { id: opponentId! },
		skip: !opponentId,
	})
	const { data } = useGetMeQuery()

	const me = data?.getMe

	const displayName = getDisplayName(me?.firstName, me?.lastName, me?.username)
	const opponentDisplayName = getDisplayName(
		opponentData?.getUser?.firstName,
		opponentData?.getUser?.lastName,
		opponentData?.getUser?.username,
		'Соперник',
	)

	const isMyTurn = turn === me?.id
	const opponentSymbol = symbol === 'X' ? 'O' : symbol === 'O' ? 'X' : null

	const timeLeft = useTurnCountdown(turnDeadline ?? null)
	const timerFraction = timeLeft / TURN_SECONDS
	const timerUrgent = timeLeft <= 5

	const handleClick = (index: number) => {
		if (!me || !symbol) return
		if (turn !== me.id) return
		if (board[index] !== null) return
		socket.emit('make_move', { index })
	}

	if (!roomId) {
		return (
			<div className='flex flex-col items-center gap-2 py-16 text-center text-white/30'>
				<span className='text-sm'>Игра не активна</span>
			</div>
		)
	}

	return (
		<div className='mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-3 text-white sm:px-4'>
			{/* Turn indicator */}
			<m.div
				key={turn}
				initial={{ opacity: 0, y: -6 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className='flex w-full flex-col items-center gap-2'
			>
				{/* X vs O symbols */}
				<div className='flex items-center gap-4'>
					<m.span
						animate={{
							opacity: isMyTurn ? 1 : 0.25,
							scale: isMyTurn ? 1 : 0.9,
						}}
						transition={{ duration: 0.3 }}
						className={cn(
							'text-5xl font-bold sm:text-6xl',
							symbol === 'X' ? 'text-indigo-400' : 'text-rose-400',
						)}
					>
						{symbol}
					</m.span>

					<span className='text-xs font-semibold tracking-widest text-white/20'>
						VS
					</span>

					<m.span
						animate={{
							opacity: !isMyTurn ? 1 : 0.25,
							scale: !isMyTurn ? 1 : 0.9,
						}}
						transition={{ duration: 0.3 }}
						className={cn(
							'text-5xl font-bold sm:text-6xl',
							opponentSymbol === 'X' ? 'text-indigo-400' : 'text-rose-400',
						)}
					>
						{opponentSymbol}
					</m.span>
				</div>

				{/* Status pill */}
				<div
					className={cn(
						'rounded-xl border px-3 py-1 text-xs font-semibold transition-all duration-300',
						reconnecting
							? 'border-amber-500/25 bg-amber-500/10 text-amber-400'
							: isMyTurn
								? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
								: 'border-white/[0.06] bg-white/[0.03] text-white/30',
					)}
				>
					{reconnecting
						? 'Переподключение…'
						: isMyTurn
							? 'Ваш ход'
							: 'Ход соперника'}
				</div>

				{/* Timer bar */}
				{!reconnecting && (
					<div className='w-full max-w-xs'>
						<div className='flex items-center justify-between mb-1'>
							<span
								className={cn(
									'text-xs font-mono font-semibold tabular-nums transition-colors duration-300',
									timerUrgent
										? 'text-red-400'
										: isMyTurn
											? 'text-emerald-400'
											: 'text-white/30',
								)}
							>
								{timeLeft}с
							</span>
						</div>
						<div className='h-1 w-full overflow-hidden rounded-full bg-white/[0.06]'>
							<m.div
								className={cn(
									'h-full rounded-full transition-colors duration-300',
									timerUrgent
										? 'bg-red-400'
										: isMyTurn
											? 'bg-emerald-400'
											: 'bg-white/20',
								)}
								animate={{ width: `${timerFraction * 100}%` }}
								transition={{ duration: 0.2, ease: 'linear' }}
							/>
						</div>
					</div>
				)}
			</m.div>

			{/* Players row */}
			<div className='flex w-full items-stretch gap-3'>
				{/* Me */}
				<m.div
					animate={{ opacity: isMyTurn ? 1 : 0.45 }}
					transition={{ duration: 0.3 }}
					className={cn(
						'relative flex flex-1 items-center gap-3 overflow-hidden rounded-2xl border p-3 backdrop-blur-xl transition-colors duration-300',
						isMyTurn
							? 'border-indigo-500/25 bg-indigo-500/[0.07]'
							: 'border-white/[0.06] bg-white/[0.02]',
					)}
				>
					{isMyTurn && (
						<div className='absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-indigo-400' />
					)}
					<img
						className='max-h-11 max-w-11 shrink-0 rounded-xl object-cover sm:max-h-13 sm:max-w-13'
						src={
							me?.avatar ||
							`https://ui-avatars.com/api/?name=${displayName}&background=random`
						}
						alt='avatar'
					/>
					<div className='min-w-0 flex-1'>
						<div className='flex items-center gap-1.5'>
							<span className='truncate text-sm font-semibold text-white/90'>
								{displayName}
							</span>
							{me?.role === 'ADMIN' && <AdminLabel />}
						</div>
						<span className='text-xs text-white/30'>#{me?.publicId}</span>
					</div>
				</m.div>

				{/* Opponent */}
				<m.div
					animate={{ opacity: !isMyTurn ? 1 : 0.45 }}
					transition={{ duration: 0.3 }}
					className={cn(
						'relative flex flex-1 items-center justify-end gap-3 overflow-hidden rounded-2xl border p-3 backdrop-blur-xl transition-colors duration-300',
						!isMyTurn
							? 'border-rose-500/25 bg-rose-500/[0.07]'
							: 'border-white/[0.06] bg-white/[0.02]',
					)}
				>
					{!isMyTurn && (
						<div className='absolute inset-y-0 right-0 w-[3px] rounded-l-full bg-rose-400' />
					)}
					<div className='min-w-0 flex-1 text-right'>
						<div className='flex items-center justify-end gap-1.5'>
							{opponentData?.getUser?.role === 'ADMIN' && <AdminLabel />}
							<span className='truncate text-sm font-semibold text-white/90'>
								{opponentDisplayName}
							</span>
						</div>
						<span className='text-xs text-white/30'>
							#{opponentData?.getUser?.publicId}
						</span>
					</div>
					<img
						className='max-h-11 max-w-11 shrink-0 rounded-xl object-cover sm:max-h-13 sm:max-w-13'
						src={
							opponentData?.getUser?.avatar ||
							(opponentName
								? `https://ui-avatars.com/api/?name=${opponentName}&background=random`
								: '/placeholder-avatar.png')
						}
						alt='avatar'
					/>
				</m.div>
			</div>

			{/* Board */}
			<div
				className={cn(
					styles.board,
					'aspect-square w-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-2 backdrop-blur-xl transition-all duration-300',
					(!isMyTurn || reconnecting) && 'pointer-events-none opacity-60',
				)}
			>
				{board.map((square, index) => (
					<Square
						key={index}
						value={square}
						removing={index === removingIndex}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>

			<WinnerModal />
		</div>
	)
}
