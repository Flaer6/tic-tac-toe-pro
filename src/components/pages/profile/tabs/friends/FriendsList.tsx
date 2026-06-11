import { Trash2, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
	useGetMeQuery,
	useRemoveFriendMutation,
} from '../../../../../graphql/generated/output'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'

export const FriendsList = () => {
	const { onlineUsers } = useOnlineGameStore()
	const { data, loading } = useGetMeQuery()

	const [removeFriend] = useRemoveFriendMutation({
		refetchQueries: ['GetMe'],
	})

	const friends = data?.getFriends ?? []
	const online = friends.filter(f => onlineUsers.includes(f.id))
	const offline = friends.filter(f => !onlineUsers.includes(f.id))

	const FriendCard = ({ friend }: { friend: (typeof friends)[0] }) => {
		const isOnline = onlineUsers.includes(friend.id)
		return (
			<phantom-ui loading={loading}>
				<div className='group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 transition-all hover:border-white/15 hover:bg-white/[0.07]'>
					<Link
						to={`/user/${friend.id}`}
						className='flex min-w-0 flex-1 items-center gap-3'
					>
						<div className='relative shrink-0'>
							<img
								src={friend.avatar || '/assets/favicons/512x512.jpg'}
								alt='avatar'
								className='h-11 w-11 rounded-[14px] border border-white/10 object-cover'
							/>
							<span
								className={`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#1f1d2b] transition-colors ${
									isOnline ? 'bg-emerald-400' : 'bg-zinc-600'
								}`}
							/>
						</div>

						<div className='min-w-0 flex-1'>
							<div className='flex items-center gap-2'>
								<span className='truncate text-sm font-medium text-white'>
									{friend.username}
								</span>
								<span
									className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
										isOnline
											? 'bg-emerald-400/10 text-emerald-400'
											: 'bg-white/5 text-white/30'
									}`}
								>
									{isOnline ? 'в сети' : 'офлайн'}
								</span>
							</div>
							<div className='mt-0.5 text-xs text-white/35'>
								#{friend.publicId}
							</div>
						</div>
					</Link>

					<button
						type='button'
						onClick={() =>
							removeFriend({ variables: { input: { friendId: friend.id } } })
						}
						className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-white/25 transition-all hover:border-red-500/20 hover:bg-red-500/8 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100'
						aria-label='Удалить из друзей'
					>
						<Trash2 size={16} />
					</button>
				</div>
			</phantom-ui>
		)
	}

	if (!friends.length) {
		return (
			<div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/8 bg-white/[0.02] px-4 py-12 text-center'>
				<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5'>
					<Users className='h-6 w-6 text-white/25' />
				</div>
				<p className='text-sm font-medium text-white/70'>
					Список друзей пока пуст
				</p>
				<p className='mt-1 max-w-xs text-xs text-white/35'>
					Найди пользователя выше и отправь заявку в друзья
				</p>
			</div>
		)
	}

	return (
		<div className='max-h-[420px] space-y-4 overflow-y-auto pr-1'>
			{online.length > 0 && (
				<section>
					<p className='mb-2 px-1 text-[11px] font-medium uppercase tracking-widest text-white/30'>
						В сети · {online.length}
					</p>
					<div className='space-y-2'>
						{online.map(f => (
							<FriendCard key={f.id} friend={f} />
						))}
					</div>
				</section>
			)}

			{offline.length > 0 && (
				<section>
					<p className='mb-2 px-1 text-[11px] font-medium uppercase tracking-widest text-white/30'>
						Не в сети · {offline.length}
					</p>
					<div className='space-y-2'>
						{offline.map(f => (
							<FriendCard key={f.id} friend={f} />
						))}
					</div>
				</section>
			)}
		</div>
	)
}
