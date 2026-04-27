import { AnimatePresence, m } from 'framer-motion'
import { useGetProfile } from '../../../hooks/useGetUser'
import { socket } from '../../../shared/socket'
import { useOnlineGameStore } from '../../../store/onlineGame.store'

export const WinnerModal = () => {
	const { winner, opponentName, reset, reconnecting } = useOnlineGameStore()
	const { user } = useGetProfile()

	const handleNewGame = () => {
		reset()
		socket.emit('find_game')
	}

	const isWin = winner === user?.id

	return (
		<AnimatePresence>
			{reconnecting && (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50'
				>
					<m.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						className='bg-[#1f1d2b] border border-white/10 px-8 py-6 rounded-2xl text-center'
					>
						<div className='text-lg font-semibold mb-3 text-yellow-400'>
							Переподключение...
						</div>

						<div className='flex gap-2 justify-center'>
							{[0, 1, 2].map(i => (
								<m.div
									key={i}
									className='w-2 h-2 bg-white rounded-full'
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

			{!reconnecting && winner && (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='absolute inset-0 flex items-center justify-center backdrop-blur-md'
				>
					<m.div
						initial={{ scale: 0.7, y: 40 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.7 }}
						className='bg-[#1f1d2b] border border-white/10 p-8 rounded-3xl shadow-2xl text-center'
					>
						<h2
							className={`text-3xl font-bold mb-3 ${
								isWin ? 'text-green-400' : 'text-red-400'
							}`}
						>
							{isWin ? 'Победа 🎉' : 'Поражение 😢'}
						</h2>

						<p className='mb-6 text-white/60'>
							{isWin ? 'Ты выиграл!' : `Победил ${opponentName}`}
						</p>

						<m.button
							whileHover={{ scale: 1.08 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleNewGame}
							className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition shadow-lg shadow-blue-600/20'
						>
							Играть снова
						</m.button>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	)
}
