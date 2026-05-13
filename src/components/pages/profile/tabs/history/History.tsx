import { Clock, Trophy, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
	useGetMeQuery,
	useGetMyHistoryQuery,
} from '../../../../../graphql/generated/output'

export const GameHistory = () => {
	const { data } = useGetMyHistoryQuery()

	const { data: user } = useGetMeQuery()

	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			<div className='mb-6 sm:mb-8'>
				<h2 className='text-2xl font-semibold text-white sm:text-3xl'>
					История игр
				</h2>
			</div>

			<div className='rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-5 md:p-6'>
				<div className='mb-4 flex items-center justify-between'>
					<div className='flex items-center gap-2 text-white/80'>
						<Clock className='h-5 w-5 text-white/50' />

						<span className='text-sm font-medium sm:text-base'>
							Последние игры
						</span>
					</div>

					<span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 sm:text-sm'>
						{data?.getMyHistory.length}
					</span>
				</div>

				<div className='flex max-h-[400px] flex-col gap-4 overflow-y-auto'>
					{data?.getMyHistory.map(game => {
						const me = game.players.find(p => p.userId === user?.getMe?.id)

						const opponent = game.players.find(
							p => p.userId !== user?.getMe?.id,
						)

						const isWin = me?.winner

						return (
							<div
								key={game.id}
								className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
									isWin
										? 'border-emerald-500/20 bg-emerald-500/5'
										: 'border-red-500/20 bg-red-500/5'
								}`}
							>
								<Link
									to={`/${opponent?.user.id}`}
									className='flex items-center gap-4 transition-opacity hover:opacity-80'
								>
									<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5'>
										{isWin ? (
											<Trophy className='text-emerald-400' />
										) : (
											<XCircle className='text-red-400' />
										)}
									</div>

									<div>
										<div className='font-medium text-white'>
											vs {opponent?.user.username || 'Unknown'}
										</div>

										<div className='text-sm text-white/50'>
											ID: {opponent?.user.id}
										</div>

										<div className='text-sm text-white/50'>
											{game.finishedAt &&
												new Date(game.finishedAt).toLocaleDateString()}
										</div>
									</div>
								</Link>

								<div className='text-sm text-white/60'>
									{isWin ? 'Победа' : 'Поражение'}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
