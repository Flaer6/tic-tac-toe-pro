import cn from 'clsx'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { socket } from '../../../../../shared/socket'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'
import { OnlineBoard } from './OnlineBoard'

export const OnlineGame = () => {
	const cells = Array.from({ length: 9 })
	const { mode, setMode, roomId, status, setStatus, clearGameOverTimer } =
		useOnlineGameStore()

	const handleFind = () => {
		clearGameOverTimer()
		socket.emit('find_game', { mode })
		setStatus('searching')
	}

	const handleCancel = () => {
		socket.emit('cancel_search')
	}

	useEffect(() => {
		if (roomId) setStatus('found')
	}, [])

	return (
		<div className='flex h-full w-full flex-col items-center justify-center gap-8 text-white'>
			{/* Mini board */}
			{status !== 'found' && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
					className='relative w-full max-w-[280px] sm:max-w-[340px]'
				>
					<div className='pointer-events-none absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl' />
					<div className='relative grid grid-cols-3 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-2 backdrop-blur-xl'>
						{cells.map((_, i) => (
							<div
								key={i}
								className='flex aspect-square items-center justify-center border border-white/[0.05]'
							>
								<motion.span
									initial={{ opacity: 0, scale: 0 }}
									className={cn(
										'text-lg font-bold sm:text-xl md:text-2xl',
										i % 2 === 0 ? 'X' : 'O',
									)}
									animate={
										status === 'searching'
											? { opacity: [0, 1, 0], scale: [0, 1.4, 0] }
											: { opacity: 0.12, scale: 1 }
									}
									transition={
										status === 'searching'
											? {
													duration: 1.4,
													repeat: Infinity,
													delay: i * 0.09,
													ease: 'easeInOut',
												}
											: { duration: 0.4 }
									}
								>
									{i % 2 === 0 ? 'X' : 'O'}
								</motion.span>
							</div>
						))}
					</div>
				</motion.div>
			)}

			{/* Idle state */}
			{status === 'idle' && (
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className='flex flex-col items-center gap-5'
				>
					{/* Mode selector */}
					<div className='flex items-center gap-1 rounded-2xl border border-white/8 bg-white/3 p-1 backdrop-blur-sm'>
						{(['limit', 'classic'] as const).map(m => (
							<button
								key={m}
								onClick={() => setMode(m)}
								className={cn(
									'rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200',
									mode === m
										? 'bg-indigo-500/20 border border-indigo-500/30 text-white'
										: 'text-white/30 hover:text-white/60',
								)}
							>
								{m === 'limit' ? 'Лимит ходов' : 'Классика'}
							</button>
						))}
					</div>

					<p className='text-xs text-white/25 tracking-wide'>
						{mode === 'limit'
							? 'У каждого игрока максимум 3 фишки — старая исчезает'
							: 'Классические крестики-нолики без ограничений'}
					</p>

					<div className='text-center'>
						<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
							Онлайн
						</p>
						<h2 className='text-2xl font-bold text-white sm:text-3xl'>
							Готов сыграть?
						</h2>
						<p className='mt-1.5 text-sm text-white/35'>
							Найди соперника и сыграй партию в реальном времени
						</p>
					</div>

					<button
						onClick={handleFind}
						className='rounded-2xl px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95'
						style={{
							background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
							boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
						}}
					>
						Найти игру
					</button>
				</motion.div>
			)}

			{/* Searching state */}
			{status === 'searching' && (
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex flex-col items-center gap-5'
				>
					<div className='text-center'>
						<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
							Поиск • {mode === 'limit' ? 'Лимит ходов' : 'Классика'}
						</p>
						<h2 className='text-xl font-bold text-white'>Ищем соперника…</h2>
					</div>

					<div className='flex items-center gap-2'>
						{[0, 1, 2].map(i => (
							<motion.div
								key={i}
								className='h-2 w-2 rounded-full bg-indigo-400'
								animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
								transition={{
									duration: 0.8,
									repeat: Infinity,
									delay: i * 0.15,
									ease: 'easeInOut',
								}}
							/>
						))}
					</div>

					<button
						onClick={handleCancel}
						className='rounded-xl border border-red-500/20 bg-red-500/[0.07] px-5 py-2.5 text-xs font-semibold text-red-400/80 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/[0.12] hover:text-red-400'
					>
						Отменить поиск
					</button>
				</motion.div>
			)}

			{/* Found */}
			{status === 'found' && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
					className='flex w-full flex-col items-center'
				>
					<OnlineBoard />
				</motion.div>
			)}
		</div>
	)
}
