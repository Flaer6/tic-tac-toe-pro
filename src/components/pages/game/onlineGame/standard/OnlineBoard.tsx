import cn from 'clsx'
import { m } from 'framer-motion'
import {
	useGetMeQuery,
	useGetUserQuery,
} from '../../../../../graphql/generated/output'
import { socket } from '../../../../../shared/socket'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'
import { AdminLabel } from '../../../../ui/status/AdminLabel'
import Square from '../../localGame/standard/Square'
import styles from '../../localGame/standard/localGame.module.css'
import { WinnerModal } from './WinnerModal'

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
	} = useOnlineGameStore()

	const { data: opponentData } = useGetUserQuery({
		variables: { id: opponentId! },
	})
	const { data } = useGetMeQuery()

	const user = data?.getMe

	const displayName =
		user?.firstName || user?.lastName
			? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
			: user?.username

	const opponentDisplayName =
		opponentData?.getUser?.firstName || opponentData?.getUser?.lastName
			? `${opponentData?.getUser?.firstName ?? ''} ${opponentData?.getUser?.lastName ?? ''}`.trim()
			: opponentData?.getUser?.username || 'Соперник'

	if (!roomId) {
		return (
			<div className='flex flex-col items-center gap-2 py-16 text-center text-white/30'>
				<span className='text-sm'>Игра не активна</span>
			</div>
		)
	}

	const opponentSymbol = symbol === 'X' ? 'O' : symbol === 'O' ? 'X' : null
	const isMyTurn = turn === data?.getMe?.id

	const handleClick = (index: number) => {
		if (!data?.getMe || !symbol) return
		if (turn !== data?.getMe.id) return
		if (board[index] !== null) return
		socket.emit('make_move', { index })
	}

	return (
		<div className='mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-3 text-white sm:px-4'>
			{/* Turn indicator */}
			<m.div
				key={turn}
				initial={{ opacity: 0, y: -6 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className='flex flex-col items-center gap-1'
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
							symbol === 'X' ? 'X' : 'O',
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
							opponentSymbol === 'X' ? 'X' : 'O',
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
							data?.getMe?.avatar ||
							`https://ui-avatars.com/api/?name=${displayName}&background=random`
						}
						alt='avatar'
					/>
					<div className='min-w-0 flex-1'>
						<div className='flex items-center gap-1.5'>
							<span className='truncate text-sm font-semibold text-white/90'>
								{displayName}
							</span>
							{data?.getMe.role === 'ADMIN' && <AdminLabel />}
						</div>
						<span className='text-xs text-white/30'>
							#{data?.getMe?.publicId}
						</span>
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
