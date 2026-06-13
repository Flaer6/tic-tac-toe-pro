import { AnimatePresence, m } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	useGetMeQuery,
	useGetMyHistoryQuery,
} from '../../../../../graphql/generated/output'
import { socket } from '../../../../../shared/socket'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'

const ParticlesBurst = ({ isWin }: { isWin: boolean }) => {
	const particles = Array.from({ length: 16 })
	const color = isWin ? '#4ade80' : '#f87171'

	return (
		<div className='absolute inset-0 pointer-events-none overflow-hidden rounded-3xl'>
			{particles.map((_, i) => {
				const angle = (i / particles.length) * 360
				const distance = 60 + Math.random() * 60
				const x = Math.cos((angle * Math.PI) / 180) * distance
				const y = Math.sin((angle * Math.PI) / 180) * distance
				const size = 3 + Math.random() * 5

				return (
					<m.div
						key={i}
						className='absolute rounded-full'
						style={{
							width: size,
							height: size,
							backgroundColor: i % 3 === 0 ? '#fff' : color,
							left: '50%',
							top: '30%',
							opacity: 0,
						}}
						animate={{
							x: [0, x],
							y: [0, y],
							opacity: [0, 1, 0],
							scale: [0, 1.5, 0],
						}}
						transition={{
							duration: 1.2,
							delay: 0.2 + i * 0.04,
							ease: 'easeOut',
						}}
					/>
				)
			})}
		</div>
	)
}

export const WinnerModal = () => {
	const {
		winner,
		opponentName,
		reset,
		reconnecting,
		setStatus,
		clearGameOverTimer,
	} = useOnlineGameStore()
	const { data } = useGetMeQuery()
	const { refetch: refetchHistory } = useGetMyHistoryQuery({ skip: !winner })

	useEffect(() => {
		if (!winner) return
		void refetchHistory()
	}, [winner])

	const isWin = winner === data?.getMe?.id

	const displayName =
		data?.getMe?.firstName || data?.getMe?.lastName
			? `${data?.getMe?.firstName ?? ''} ${data?.getMe?.lastName ?? ''}`.trim()
			: data?.getMe?.username

	// НЕ используем useGameSocket — он регистрирует дублирующие листенеры
	const handleNewGame = () => {
		clearGameOverTimer()
		setStatus('searching')
		socket.emit('find_game')
	}

	const handleMenu = () => {
		clearGameOverTimer()
		reset()
	}

	return (
		<AnimatePresence>
			{/* Reconnecting overlay */}
			{reconnecting && (
				<m.div
					key='reconnecting'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-lg'
				>
					<m.div
						initial={{ scale: 0.85, y: 16 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.85, y: 16 }}
						className='relative rounded-2xl border border-white/10 bg-[#13111c] px-8 py-7 text-center shadow-2xl'
					>
						<div className='absolute inset-0 rounded-2xl ring-1 ring-yellow-400/20 pointer-events-none' />
						<div
							className='mb-5 text-base font-semibold tracking-wide sm:text-lg'
							style={{ color: '#facc15', fontFamily: "'DM Mono', monospace" }}
						>
							Переподключение…
						</div>
						<div className='flex justify-center gap-3'>
							{[0, 1, 2].map(i => (
								<m.div
									key={i}
									className='h-2 w-2 rounded-full bg-yellow-400'
									animate={{ y: [0, -7, 0], opacity: [0.4, 1, 0.4] }}
									transition={{
										duration: 0.7,
										repeat: Infinity,
										delay: i * 0.18,
										ease: 'easeInOut',
									}}
								/>
							))}
						</div>
					</m.div>
				</m.div>
			)}

			{/* Winner / Loser modal */}
			{!reconnecting && winner && (
				<m.div
					key='result'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.35 }}
					className='absolute inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-lg'
				>
					<m.div
						initial={{ scale: 0.72, y: 48, opacity: 0 }}
						animate={{ scale: 1, y: 0, opacity: 1 }}
						exit={{ scale: 0.72, y: 48, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 26 }}
						className='relative w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl sm:max-w-md'
						style={{
							background: 'linear-gradient(160deg, #1a1828 0%, #0f0d1a 100%)',
						}}
					>
						{/* Top accent bar */}
						<div
							className='absolute inset-x-0 top-0 h-[3px]'
							style={{
								background: isWin
									? 'linear-gradient(90deg, transparent, #4ade80, transparent)'
									: 'linear-gradient(90deg, transparent, #f87171, transparent)',
							}}
						/>

						{/* Ambient glow */}
						<div
							className='pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl opacity-20'
							style={{ background: isWin ? '#22c55e' : '#ef4444' }}
						/>

						<ParticlesBurst isWin={isWin} />

						<div className='relative z-10 flex flex-col items-center gap-5 p-6 sm:p-8'>
							{/* Emoji badge */}
							<m.div
								initial={{ scale: 0, rotate: -20 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 18,
									delay: 0.15,
								}}
								className='flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg sm:h-20 sm:w-20 sm:text-5xl'
								style={{
									background: isWin
										? 'linear-gradient(135deg, #166534 0%, #15803d 100%)'
										: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
									boxShadow: isWin
										? '0 0 32px rgba(74,222,128,0.25)'
										: '0 0 32px rgba(248,113,113,0.25)',
								}}
							>
								{isWin ? '🏆' : '💀'}
							</m.div>

							{/* Title */}
							<div className='text-center'>
								<m.h2
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className='text-2xl font-extrabold tracking-tight sm:text-3xl'
									style={{
										fontFamily: "'DM Mono', monospace",
										color: isWin ? '#4ade80' : '#f87171',
									}}
								>
									{isWin ? 'Победа!' : 'Поражение'}
								</m.h2>
								<m.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									className='mt-1 text-sm tracking-wide text-white/40'
								>
									{isWin
										? 'Отличная игра, так держать!'
										: `${opponentName ?? 'Соперник'} оказался сильнее`}
								</m.p>
							</div>

							{/* Winner card */}
							{isWin && data?.getMe && (
								<m.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.35 }}
									className='flex w-full items-center gap-3 rounded-2xl px-4 py-3'
									style={{
										background: 'rgba(255,255,255,0.05)',
										border: '1px solid rgba(255,255,255,0.08)',
									}}
								>
									<img
										className='max-h-11 max-w-11 w-full shrink-0 rounded-xl object-cover sm:h-13 sm:w-13'
										src={
											data.getMe.avatar ||
											`https://ui-avatars.com/api/?name=${data.getMe.username}&background=1e293b&color=fff`
										}
										alt='avatar'
									/>
									<div className='min-w-0'>
										<div className='truncate text-sm font-semibold text-white sm:text-base'>
											{displayName}
										</div>
										<div className='mt-0.5 truncate text-xs text-white/40'>
											{data.getMe.publicId}
										</div>
									</div>
									<div className='ml-auto shrink-0'>
										<div
											className='rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-widest'
											style={{
												background: 'rgba(74,222,128,0.15)',
												color: '#4ade80',
											}}
										>
											MVP
										</div>
									</div>
								</m.div>
							)}

							<div
								className='h-px w-full'
								style={{ background: 'rgba(255,255,255,0.07)' }}
							/>

							{/* Buttons */}
							<div className='flex w-full flex-col gap-3 sm:flex-row'>
								<m.button
									whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
									whileTap={{ scale: 0.96 }}
									onClick={handleNewGame}
									className='flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all sm:text-base'
									style={{
										background:
											'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
										boxShadow: '0 4px 20px rgba(37,99,235,0.35)',
									}}
								>
									<svg
										className='h-4 w-4'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2.5}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M5.636 18.364A9 9 0 1 0 18.364 5.636M12 3v4m0 0 2-2m-2 2L10 5'
										/>
									</svg>
									Играть снова
								</m.button>

								<m.div
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.96 }}
									onClick={handleMenu}
									className='flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all sm:text-base'
									style={{
										background: 'rgba(255,255,255,0.06)',
										border: '1px solid rgba(255,255,255,0.1)',
										color: 'rgba(255,255,255,0.7)',
									}}
								>
									<svg
										className='h-4 w-4'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2.5}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9'
										/>
									</svg>
									<Link to='/'>Главное меню</Link>
								</m.div>
							</div>
						</div>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	)
}
