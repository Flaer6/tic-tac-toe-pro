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
			id: data!.id,
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
			<div className='relative h-52 w-full overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/20'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]' />

				<div className='absolute bottom-0 left-0 flex w-full flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between'>
					<div className='flex items-end gap-5'>
						<div className='relative'>
							<img
								src={data?.avatar || 'https://i.pravatar.cc/300'}
								alt='avatar'
								className='h-28 w-28 rounded-3xl border-4 border-[#1f1d2b] object-cover shadow-2xl'
							/>

							<div
								className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-[#1f1d2b] ${
									isOnline ? 'bg-emerald-500' : 'bg-zinc-500'
								}`}
							/>
						</div>

						<div className='pb-2'>
							<div className='mb-2 flex items-center gap-3'>
								<h1 className='text-3xl font-bold text-white'>
									{data?.username}
								</h1>

								<span
									className={`rounded-xl px-3 py-1 text-xs font-medium ${
										isOnline
											? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
											: 'border border-zinc-500/20 bg-zinc-500/10 text-zinc-400'
									}`}
								>
									{isOnline ? 'В сети' : 'Не в сети'}
								</span>
							</div>

							<p className='text-sm text-zinc-400'>ID: {data?.publicId}</p>
						</div>
					</div>

					<div className='flex flex-wrap gap-3'>
						<button
							className='rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20'
							type='button'
							onClick={() =>
								sendFriendRequest({
									variables: {
										input: {
											toId: data!.id,
										},
									},
								})
							}
						>
							Добавить в друзья
						</button>

						<button
							className='rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20'
							onClick={() => toast('Пока недоступно')}
						>
							Пригласить
						</button>
					</div>
				</div>
			</div>

			<div className='grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-5 xl:p-6'>
				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Всего игр</p>

					<h3 className='text-3xl font-bold text-white'>
						{stats?.totalGames ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Побед</p>

					<h3 className='text-3xl font-bold text-emerald-400'>
						{stats?.wins ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Поражений</p>

					<h3 className='text-3xl font-bold text-red-400'>
						{stats?.losses ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Win Streak</p>

					<h3 className='text-3xl font-bold text-orange-400'>
						{stats?.winStreak ?? 0}
					</h3>
				</div>

				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5'>
					<p className='mb-2 text-sm text-zinc-400'>Win Rate</p>

					<h3 className='text-3xl font-bold text-cyan-400'>
						{stats?.winRate ?? 0}%
					</h3>
				</div>
			</div>
		</div>
	)
}
