import toast from 'react-hot-toast'
import {
	useGetUserStatsQuery,
	useSendFriendRequestMutation,
} from '../../../../graphql/generated/output'
import { useOnlineGameStore } from '../../../../store/onlineGame.store'
import type { IUser } from '../../../../types/types'

export const UserProfileHeader = ({ data }: IUser) => {
	const { onlineUsers } = useOnlineGameStore()

	const isOnline = !!data?.id && onlineUsers.includes(data.id)

	const { data: statsData } = useGetUserStatsQuery({
		variables: {
			id: data?.id,
		},
		skip: !data?.id,
	})

	const stats = statsData?.getUserStats

	const [sendFriendRequest] = useSendFriendRequestMutation({
		onCompleted() {
			toast.success('Заявка отправлена')
		},

		onError(error) {
			toast.error(error.message)
		},
	})

	return (
		<div className='overflow-hidden rounded-[32px] border border-white/10 bg-white/3 backdrop-blur-xl'>
			{/* Header */}
			<div className='relative min-h-[320px] w-full overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/20 md:min-h-[240px]'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]' />

				<div className='relative flex h-full flex-col justify-end gap-6 p-5 md:p-6'>
					<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
						{/* Profile */}
						<div className='flex flex-col items-center gap-5 sm:flex-row sm:items-end'>
							<div className='relative shrink-0'>
								<img
									src={data?.avatar || 'https://i.pravatar.cc/300'}
									alt='avatar'
									className='h-24 w-24 rounded-3xl border-4 border-[#1f1d2b] object-cover shadow-2xl sm:h-28 sm:w-28'
								/>

								<div
									className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-[#1f1d2b] sm:h-6 sm:w-6 ${
										isOnline ? 'bg-emerald-500' : 'bg-zinc-500'
									}`}
								/>
							</div>

							<div className='min-w-0 text-center sm:text-left'>
								<div className='mb-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start'>
									<h1 className='max-w-full truncate text-2xl font-bold text-white sm:text-3xl'>
										{data?.username}
									</h1>

									<span
										className={`whitespace-nowrap rounded-xl px-3 py-1 text-xs font-medium ${
											isOnline
												? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
												: 'border border-zinc-500/20 bg-zinc-500/10 text-zinc-400'
										}`}
									>
										{isOnline ? 'В сети' : 'Не в сети'}
									</span>
								</div>

								<p className='break-all text-sm text-zinc-400'>
									ID: {data?.publicId}
								</p>
							</div>
						</div>

						{/* Buttons */}
						<div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
							<button
								type='button'
								className='rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20'
								onClick={() =>
									sendFriendRequest({
										variables: {
											input: {
												toId: data?.id,
											},
										},
									})
								}
							>
								Добавить в друзья
							</button>

							<button
								type='button'
								className='rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20'
								onClick={() => toast('Пока недоступно')}
							>
								Пригласить
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Stats */}
			<div className='grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-5 xl:p-6'>
				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Всего игр</p>

					<h3 className='text-2xl font-bold text-white sm:text-3xl'>
						{stats?.totalGames ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Побед</p>

					<h3 className='text-2xl font-bold text-emerald-400 sm:text-3xl'>
						{stats?.wins ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Поражений</p>

					<h3 className='text-2xl font-bold text-red-400 sm:text-3xl'>
						{stats?.losses ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Win Streak</p>

					<h3 className='text-2xl font-bold text-orange-400 sm:text-3xl'>
						{stats?.winStreak ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Win Rate</p>

					<h3 className='text-2xl font-bold text-cyan-400 sm:text-3xl'>
						{stats?.winRate ?? 0}%
					</h3>
				</div>
			</div>
		</div>
	)
}
