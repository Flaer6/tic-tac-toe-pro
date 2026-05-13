import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import type { IHistoryUser } from '../../../../types/types'

export const UserProfileHistory = ({ data, userId }: IHistoryUser) => {
	return (
		<div className='rounded-[32px] border border-white/10 bg-white/3 p-5 backdrop-blur-xl md:p-6'>
			<div className='mb-6 flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-semibold text-white'>История игр</h2>

					<p className='mt-1 text-sm text-zinc-400'>Последние матчи игрока</p>
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				{data?.map(game => {
					const opponent = game.players.find(player => player.userId !== userId)

					const isWinner = game.winnerId === userId

					return (
						<div
							key={game.id}
							className='flex items-center justify-between rounded-3xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20 hover:bg-white/4'
						>
							<div>
								<div className='mb-2 flex items-center gap-3'>
									<span
										className={`rounded-xl px-3 py-1 text-xs font-medium ${
											isWinner
												? 'bg-emerald-500/10 text-emerald-400'
												: 'bg-red-500/10 text-red-400'
										}`}
									>
										{isWinner ? 'Победа' : 'Поражение'}
									</span>

									<p className='text-sm text-zinc-300'>
										Против{' '}
										<Link
											to={`/${opponent?.user.id}` || 'notFound'}
											className='hover:text-blue-300 hover:underline'
										>
											{opponent?.user.username || 'Неизвестно'}
										</Link>
									</p>
								</div>

								<p className='text-xs text-zinc-500'>
									{game.finishedAt
										? new Date(game.finishedAt).toLocaleDateString('ru-RU', {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
											})
										: 'Игра не завершена'}
								</p>
							</div>

							<button
								className='rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white'
								onClick={() => toast('Пока недоступно')}
							>
								Смотреть
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
