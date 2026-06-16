import toast from 'react-hot-toast'
import {
	useGetMeQuery,
	useGetUserStatsQuery,
	useSendFriendRequestMutation,
} from '../../../../graphql/generated/output'
import { useOnlineGameStore } from '../../../../store/onlineGame.store'
import type { IUser } from '../../../../types/types'
import { AdminLabel } from '../../../ui/status/AdminLabel'

export const UserProfileHeader = ({ data }: IUser) => {
	const { onlineUsers } = useOnlineGameStore()

	const isOnline = !!data?.id && onlineUsers.includes(data.id)
	const userId = data?.id

	const { data: statsData } = useGetUserStatsQuery({
		variables: { id: userId as string },
		skip: !userId,
	})
	const stats = statsData?.getUserStats
	const { data: me } = useGetMeQuery()

	const isFriend = me?.getFriends?.some(friend => friend.id === data?.id)

	const [sendFriendRequest] = useSendFriendRequestMutation({
		onCompleted() {
			toast.success('Заявка отправлена')
		},
		onError(error) {
			toast.error(error.message)
		},
	})

	const statItems = [
		{
			label: 'Всего игр',
			value: stats?.totalGames ?? 0,
			color: 'text-white',
			bar: 'bg-white/15',
			width: '100%',
		},
		{
			label: 'Побед',
			value: stats?.wins ?? 0,
			color: 'text-emerald-400',
			bar: 'bg-emerald-500',
			width: `${stats?.winRate ?? 0}%`,
		},
		{
			label: 'Поражений',
			value: stats?.losses ?? 0,
			color: 'text-red-400',
			bar: 'bg-red-500',
			width: `${100 - (stats?.winRate ?? 0)}%`,
		},
		{
			label: 'Win Streak',
			value: stats?.winStreak ?? 0,
			color: 'text-orange-400',
			bar: 'bg-orange-500',
			width: `${Math.min((stats?.winStreak ?? 0) * 10, 100)}%`,
		},
		{
			label: 'Win Rate',
			value: `${stats?.winRate ?? 0}%`,
			color: 'text-cyan-400',
			bar: 'bg-cyan-500',
			width: `${stats?.winRate ?? 0}%`,
		},
	]

	return (
		<div className='overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0f0e17]'>
			{/* Banner */}
			<div className='relative min-h-[200px] border-b border-white/[0.06] bg-[linear-gradient(135deg,rgba(99,102,241,0.25)_0%,rgba(168,85,247,0.12)_50%,rgba(6,182,212,0.18)_100%)]'>
				<div className='flex h-full flex-col justify-end p-6'>
					<div className='flex flex-wrap items-end justify-between gap-4'>
						{/* Profile */}
						<div className='flex items-end gap-5'>
							<div className='relative shrink-0'>
								<img
									src={data?.avatar || 'https://i.pravatar.cc/300'}
									alt='avatar'
									className='h-[88px] w-[88px] rounded-[20px] border-[3px] border-[#1a1826] object-cover'
								/>
								<div
									className={`absolute -bottom-1 -right-1 h-[18px] w-[18px] rounded-full border-[3px] border-[#1a1826] ${
										isOnline ? 'bg-emerald-500' : 'bg-zinc-500'
									}`}
								/>
							</div>

							<div>
								<h1 className='mb-1.5 text-2xl font-bold text-white'>
									{data?.username}
								</h1>
								<div className='mb-1.5 flex flex-wrap items-center gap-2'>
									<span
										className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-medium ${
											isOnline
												? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
												: 'border-zinc-500/20 bg-zinc-500/10 text-zinc-400'
										}`}
									>
										{isOnline ? '● В сети' : '● Не в сети'}
									</span>
									{data?.role === 'ADMIN' && <AdminLabel />}
								</div>
								<p className='text-xs text-white/30'>ID: {data?.publicId}</p>
							</div>
						</div>

						{/* Actions */}
						<div className='flex gap-2.5'>
							{isFriend ? (
								<div className='flex items-center gap-1.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400'>
									<svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
										<path
											d='M2 7l3.5 3.5L12 3.5'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									Уже в друзьях
								</div>
							) : (
								<button
									type='button'
									className='rounded-2xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/14'
									onClick={() =>
										sendFriendRequest({
											variables: { input: { toId: data!.id } },
										})
									}
								>
									Добавить в друзья
								</button>
							)}

							<button
								type='button'
								className='rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/18'
								onClick={() => toast('Пока недоступно')}
							>
								Пригласить
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Stats */}
			<div className='grid grid-cols-2 divide-x divide-y divide-white/[0.05] sm:grid-cols-3 xl:grid-cols-5 [&>*]:divide-white/[0.05]'>
				{statItems.map(({ label, value, color, bar, width }) => (
					<div key={label} className='flex flex-col gap-1.5 p-5'>
						<p className='text-[11px] font-medium uppercase tracking-widest text-white/30'>
							{label}
						</p>
						<p className={`text-[26px] font-bold tracking-tight ${color}`}>
							{value}
						</p>
						<div className='h-[3px] overflow-hidden rounded-full bg-white/[0.06]'>
							<div
								className={`h-full rounded-full ${bar} transition-all duration-500`}
								style={{ width }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
