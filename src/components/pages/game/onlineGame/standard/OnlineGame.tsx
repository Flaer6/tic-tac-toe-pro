import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useGameSocket } from '../../../../../hooks/useGameSocket'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'
import { OnlineBoard } from './OnlineBoard'

export const OnlineGame = () => {
	const cells = Array.from({ length: 9 })
	const { handleFind, handleCancel, status } = useGameSocket()
	const { roomId, setStatus } = useOnlineGameStore()

	useEffect(() => {
		if (roomId) setStatus('found')
	}, [])

	return (
		<div className='flex flex-col items-center justify-center h-full w-full gap-6 text-white'>
			{status !== 'found' && (
				<div className='flex items-center justify-center min-h-[200px] w-full '>
					<div className='grid grid-cols-3  bg-white/3 border border-white/10 rounded-2xl p-2 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px]'>
						{cells.map((_, i) => (
							<div
								key={i}
								className='aspect-square w-full border border-white/10 flex items-center justify-center'
							>
								<motion.span
									initial={{ opacity: 0, scale: 0 }}
									className={`text-sm sm:text-base md:text-lg lg:text-xl ${
										i % 2 === 0 ? 'text-green-400' : 'text-blue-400'
									}`}
									animate={
										status === 'searching'
											? { opacity: [0, 1, 0], scale: [0, 1.6, 0] }
											: {}
									}
									transition={
										status === 'searching'
											? { duration: 1.2, repeat: Infinity, delay: i * 0.08 }
											: {}
									}
								>
									{i % 2 === 0 ? 'X' : 'O'}
								</motion.span>
							</div>
						))}
					</div>
				</div>
			)}
			{status === 'idle' && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className='flex flex-col items-center gap-4'
				>
					<h2 className='text-xl text-white/70'>Готов сыграть онлайн?</h2>

					<button
						onClick={handleFind}
						className='px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95'
					>
						Найти игру
					</button>
				</motion.div>
			)}

			{status === 'searching' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='flex flex-col items-center gap-6'
				>
					<div className='text-white/60 text-sm'>Поиск соперника...</div>

					<button
						onClick={handleCancel}
						className='px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition'
					>
						Отменить поиск
					</button>
				</motion.div>
			)}

			{status === 'found' && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className='flex flex-col items-center gap-4 w-full'
				>
					<div className=''>
						<OnlineBoard />
					</div>
				</motion.div>
			)}
		</div>
	)
}
