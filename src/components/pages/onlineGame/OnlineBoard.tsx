import { AnimatePresence, m } from 'framer-motion'
import { useGetProfile } from '../../../hooks/useGetUser'
import { socket } from '../../../shared/socket'
import { useOnlineGameStore } from '../../../store/onlineGame.store'

import Square from '../localGame/Square'
import styles from '../localGame/localGame.module.css'

export function OnlineBoard() {
	const {
		board,
		turn,
		symbol,
		removingIndex,
		winner,
		opponentName,
		reset,
		reconnecting,
	} = useOnlineGameStore()

	const { data: user } = useGetProfile()

	const opponentSymbol = symbol === 'X' ? 'O' : symbol === 'O' ? 'X' : null
	const isMyTurn = turn === user?.id
	const isWin = winner === user?.id

	const handleClick = (index: number) => {
		if (!user || !symbol) return
		if (turn !== user.id) return
		if (board[index] !== null) return

		socket.emit('make_move', { index })
	}

	const handleNewGame = () => {
		reset()
		socket.emit('find_game')
	}

	return (
		<div className='text-white'>
			{/* 🔥 HEADER */}
			<div className='mb-6 flex justify-between items-center'>
				<m.div animate={{ opacity: isMyTurn ? 1 : 0.4 }}>
					<div className='text-lg font-semibold'>Вы: {user?.username}</div>
					<div className='text-sm text-gray-400'>Символ: {symbol}</div>
				</m.div>

				<m.div
					key={turn}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className='text-xl font-bold'
				>
					{reconnecting
						? 'Переподключение...'
						: isMyTurn
							? 'Ваш ход'
							: 'Ход соперника'}
				</m.div>

				<m.div animate={{ opacity: !isMyTurn ? 1 : 0.4 }}>
					<div className='text-lg font-semibold text-right'>{opponentName}</div>
					<div className='text-sm text-gray-400 text-right'>
						Символ: {opponentSymbol}
					</div>
				</m.div>
			</div>

			{/* 🎮 BOARD */}
			<div
				className={
					styles.board +
					' ' +
					(!isMyTurn || reconnecting
						? 'pointer-events-none opacity-50 blur-[1px]'
						: '')
				}
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

			{/* 🎭 OVERLAYS */}
			<AnimatePresence>
				{/* 🔄 RECONNECT (приоритет выше) */}
				{reconnecting && (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50'
					>
						<m.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='bg-white text-black px-8 py-6 rounded-2xl shadow-xl text-center'
						>
							<div className='text-xl font-bold mb-3'>
								🔄 Переподключение...
							</div>

							<div className='flex gap-2 justify-center'>
								{[0, 1, 2].map(i => (
									<m.div
										key={i}
										className='w-2 h-2 bg-black rounded-full'
										animate={{ y: [0, -6, 0] }}
										transition={{
											duration: 0.6,
											repeat: Infinity,
											delay: i * 0.2,
										}}
									/>
								))}
							</div>
						</m.div>
					</m.div>
				)}

				{/* 🏆 RESULT */}
				{!reconnecting && winner && (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md'
					>
						<m.div
							initial={{ scale: 0.7, y: 40, opacity: 0 }}
							animate={{ scale: 1, y: 0, opacity: 1 }}
							exit={{ scale: 0.7, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 180 }}
							className='bg-gradient-to-br from-white to-gray-200 text-black p-8 rounded-3xl shadow-2xl text-center'
						>
							<h2 className='text-4xl font-bold mb-4'>
								{isWin ? '🎉 Победа!' : '😢 Поражение'}
							</h2>

							<p className='mb-6 text-lg'>
								{isWin ? 'Ты выиграл! 🔥' : `Победил ${opponentName}`}
							</p>

							<m.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleNewGame}
								className='px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition'
							>
								Играть снова
							</m.button>
						</m.div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}
