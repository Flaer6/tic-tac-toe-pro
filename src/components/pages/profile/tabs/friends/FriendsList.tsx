import { Trash2, User, Users } from 'lucide-react'
import { useProfile } from '../../../../../hooks/useProfile'
import { useOnlineGameStore } from '../../../../../store/onlineGame.store'

export const FriendsList = () => {
	const { onlineUsers } = useOnlineGameStore()
	const { getFriends, friendRemove } = useProfile()
	return (
		<div className='max-h-[420px] space-y-3 overflow-y-auto pr-1 sm:pr-2'>
			{getFriends?.length ? (
				getFriends.map(friend => {
					const isOnline = onlineUsers.includes(friend.id)

					return (
						<div
							key={friend.id}
							className='group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10 sm:gap-4 sm:p-4'
						>
							<div className='relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
								<User className='h-5 w-5 text-white/70 sm:h-6 sm:w-6' />
								<span
									className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-[#1f1d2b]
							${
								isOnline
									? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]'
									: 'bg-gray-500'
							}
						`}
								/>
							</div>

							<div className='min-w-0 flex-1'>
								<div className='flex items-center gap-2'>
									<div className='truncate text-sm font-medium text-white sm:text-base'>
										{friend.username}
									</div>

									<span
										className={`text-xs ${
											isOnline ? 'text-emerald-400' : 'text-gray-400'
										}`}
									>
										{isOnline ? 'в сети' : 'оффлайн'}
									</span>
								</div>

								<div className='truncate text-xs text-white/50 sm:text-sm'>
									ID: {friend.publicId}
								</div>
							</div>

							<button
								type='button'
								onClick={() => friendRemove(friend.id)}
								className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/5 text-red-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 sm:opacity-0 sm:group-hover:opacity-100'
							>
								<Trash2 size={18} />
							</button>
						</div>
					)
				})
			) : (
				<div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center'>
					<div className='mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5'>
						<Users className='h-7 w-7 text-white/30' />
					</div>
					<div className='text-base font-medium text-white/80'>
						Список друзей пока пуст
					</div>
					<div className='mt-1 max-w-sm text-sm text-white/45'>
						Найди пользователя выше и отправь заявку в друзья
					</div>
				</div>
			)}
		</div>
	)
}
