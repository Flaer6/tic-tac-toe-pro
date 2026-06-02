import cn from 'clsx'
import { m } from 'framer-motion'
import {
	useGetMeQuery,
	useGetUserQuery,
} from '../../../../graphql/generated/output'
import { socket } from '../../../../shared/socket'
import { useOnlineGameStore } from '../../../../store/onlineGame.store'
import Square from '../localGame/Square'
import styles from '../localGame/localGame.module.css'
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
			? `${opponentData?.getUser?.firstName ?? ''} ${
					opponentData?.getUser?.lastName ?? ''
				}`.trim()
			: opponentData?.getUser?.username || 'Соперник'

	if (!roomId) {
		return <div className='text-center text-white py-8'>Игра не активна</div>
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
		<div className='text-white flex flex-col items-center w-full max-w-5xl mx-auto px-3 sm:px-4'>
			{/* VS */}
			<m.div
				key={turn}
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className='text-center '
			>
				<div className='flex items-center justify-center gap-2 sm:gap-4 text-white/40 mb-1'>
					<m.div
						animate={{ opacity: isMyTurn ? 1 : 0.5 }}
						className={cn(
							'text-3xl sm:text-5xl md:text-6xl font-bold',
							symbol === 'X' ? 'text-blue-400' : 'text-red-400',
						)}
					>
						{symbol}
					</m.div>

					<div className='text-sm sm:text-lg'>VS</div>

					<m.div
						animate={{ opacity: !isMyTurn ? 1 : 0.5 }}
						className={cn(
							'text-3xl sm:text-5xl md:text-6xl font-bold',
							opponentSymbol === 'X' ? 'text-blue-400' : 'text-red-400',
						)}
					>
						{opponentSymbol}
					</m.div>
				</div>

				<div
					className={`text-xs sm:text-sm font-semibold ${
						reconnecting
							? 'text-yellow-400'
							: isMyTurn
								? 'text-green-400'
								: 'text-white/60'
					}`}
				>
					{reconnecting
						? 'Переподключение...'
						: isMyTurn
							? 'Ваш ход'
							: 'Ход соперника'}
				</div>
			</m.div>
			{/* Игроки */}
			<div className='mb-5 w-full flex  items-center  gap-4 '>
				{/* Я */}
				<m.div
					animate={{ opacity: isMyTurn ? 1 : 0.5 }}
					className='flex items-center gap-3 w-full backdrop-blur-xl bg-white/10 rounded-md p-2 '
				>
					<img
						className='max-w-12 w-full max-h-12 sm:w-14 sm:h-14 rounded-md object-cover shrink-0'
						src={data?.getMe?.avatar}
						alt='avatar'
					/>

					<div className='flex flex-col min-w-0'>
						<span className='text-sm sm:text-base md:text-lg font-semibold truncate'>
							{displayName}
						</span>

						<span className='text-xs sm:text-sm text-white/50'>
							{data?.getMe?.publicId}
						</span>
					</div>
				</m.div>

				{/* Соперник */}
				<m.div
					animate={{ opacity: !isMyTurn ? 1 : 0.5 }}
					className='flex items-center justify-end gap-3 w-full backdrop-blur-xl bg-white/10 rounded-md p-2 bg-gradient'
				>
					<div className='flex flex-col items-end min-w-0'>
						<span className='text-sm sm:text-base md:text-lg font-semibold truncate'>
							{opponentDisplayName}
						</span>

						<span className='text-xs sm:text-sm text-white/50'>
							{opponentData?.getUser?.publicId}
						</span>
					</div>

					<img
						className='max-w-12 w-full max-h-12 sm:w-14 sm:h-14 rounded-md object-cover shrink-0'
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

			{/* Игровое поле */}
			<div
				className={`
					${styles.board}
					w-full
			

					aspect-square
					bg-white/3
					border
					border-white/10
					rounded-2xl
					p-2
					backdrop-blur-xl
					transition-all
					${!isMyTurn || reconnecting ? 'pointer-events-none opacity-70' : ''}
				`}
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
