import { motion } from 'framer-motion'
import { useGameSocket } from '../../../hooks/useGameSocket'
import { Loader } from '../../ui/Loader'
import { OnlineBoard } from './OnlineBoard'

export const OnlineGame = () => {
	const { handleFind, handleCancel, status } = useGameSocket()

	return (
		<div className='flex flex-col items-center justify-center h-full w-full gap-6 text-white'>
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
					<Loader />
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
					<div className='text-lg text-green-400 flex items-center gap-2'>
						🎮 Игра найдена!
					</div>

					<div className=''>
						<OnlineBoard />
					</div>
				</motion.div>
			)}
		</div>
	)
}
