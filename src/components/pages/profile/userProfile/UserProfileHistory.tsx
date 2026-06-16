import { motion } from 'framer-motion'
import { Clock, Trophy, User, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { IHistoryUser } from '../../../../types/types'

export const UserProfileHistory = ({ data, userId }: IHistoryUser) => {
	const games = data ?? []
	const wins = games.filter(g => g.winnerId === userId).length

	return (
		<div className='w-full '>
			<div className='relative overflow-hidden rounded-3xl border border-white/6 bg-white/2 backdrop-blur-xl'>
				{/* Top gradient line */}
				<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent' />

				{/* Card header */}
				<div className='flex items-center justify-between border-b border-white/5 px-5 py-4'>
					<div className='flex items-center gap-2.5 text-white/70'>
						<Clock className='h-4 w-4 text-white/30' />
						<span className='text-sm font-medium'>Последние игры</span>
					</div>

					<div className='flex items-center gap-2'>
						<span className='rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400'>
							{wins}W
						</span>
						<span className='rounded-xl border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400'>
							{games.length - wins}L
						</span>
						<span className='rounded-xl border border-white/[0.07] bg-white/4 px-2.5 py-1 text-xs font-medium text-white/40'>
							{games.length} игр
						</span>
					</div>
				</div>

				{/* List */}
				<motion.div
					className='flex max-h-[460px] flex-col overflow-y-auto'
					initial='hidden'
					animate='show'
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.06 } },
					}}
				>
					{games.length === 0 && (
						<div className='flex flex-col items-center gap-3 py-16 text-center'>
							<Clock className='h-8 w-8 text-white/15' />
							<p className='text-sm text-white/30'>Игр пока нет</p>
						</div>
					)}

					{games.map(game => {
						const opponent = game.players.find(p => p.userId !== userId)
						const isWin = game.winnerId === userId

						return (
							<motion.div
								key={game.id}
								variants={{
									hidden: { opacity: 0, y: 6 },
									show: {
										opacity: 1,
										y: 0,
										transition: { duration: 0.28, ease: 'easeOut' },
									},
								}}
								className={`
									group relative border-b border-white/4 last:border-b-0
									transition-colors duration-200
									${isWin ? 'hover:bg-emerald-500/4' : 'hover:bg-red-500/4'}
								`}
							>
								{/* Win/loss side bar */}
								<div
									className={`absolute inset-y-0 left-0 w-[3px] ${isWin ? 'bg-emerald-500' : 'bg-red-500'} opacity-50 transition-opacity duration-200 group-hover:opacity-90`}
								/>

								<div className='flex items-center justify-between px-5 py-4 pl-7'>
									<div className='flex items-center gap-4'>
										<div
											className={`
												flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
												border transition-colors duration-200
												${
													isWin
														? 'border-emerald-500/20 bg-emerald-500/10 group-hover:bg-emerald-500/15'
														: 'border-red-500/20 bg-red-500/10 group-hover:bg-red-500/15'
												}
											`}
										>
											{isWin ? (
												<Trophy className='h-4 w-4 text-emerald-400' />
											) : (
												<XCircle className='h-4 w-4 text-red-400' />
											)}
										</div>

										<div>
											<div className='flex items-center gap-2'>
												<Link
													to={`/user/${opponent?.user.id}` || '/notFound'}
													className='text-sm font-semibold text-white/90 hover:text-white hover:underline'
												>
													{opponent?.user.username || 'Unknown'}
												</Link>
												<span
													className={`text-xs font-semibold ${isWin ? 'text-emerald-400' : 'text-red-400'}`}
												>
													{isWin ? 'Победа' : 'Поражение'}
												</span>
											</div>
											<div className='mt-0.5 flex items-center gap-3'>
												<span className='flex items-center gap-1 text-xs text-white/30'>
													<User className='h-3 w-3' />
													{opponent?.user.id?.slice(0, 8)}…
												</span>
												{game.finishedAt && (
													<span className='text-xs text-white/30'>
														{new Date(game.finishedAt).toLocaleDateString(
															'ru-RU',
															{
																day: 'numeric',
																month: 'short',
																year: 'numeric',
															},
														)}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)
					})}
				</motion.div>
			</div>
		</div>
	)
}
