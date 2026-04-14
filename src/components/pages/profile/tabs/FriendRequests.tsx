import { Check, User, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useProfile } from '../../../../hooks/useProfile'
import { FriendStatus } from '../../../../types/types'

export const FriendRequests = () => {
	const { requests, acceptFriend, rejectFriend } = useProfile()
	return (
		<div className=''>
			<h3 className='text-white text-lg font-semibold mb-4'>
				Заявки в друзья:
			</h3>
			<div className='bg-gradient-to-br from-white/10 to-white/0 p-6 rounded-3xl border border-white/10'>
				{/* header */}

				<div className='space-y-3 overflow-y-auto pr-2 max-h-[400px]'>
					{requests
						?.filter(r => r.status === FriendStatus.PENDING)
						.map(request => (
							<div
								key={request.id}
								className='group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
							>
								{/* avatar */}
								<div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center'>
									<User className='w-6 h-6 text-white/70' />
								</div>

								{/* info */}
								<div className='flex flex-col'>
									<span className='text-white font-medium'>
										{request.from?.username}
									</span>

									<span className='text-white/50 text-sm'>
										ID: {request.from?.publicId}
									</span>
								</div>

								{/* actions */}
								<div className='ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition'>
									<button
										onClick={async () => {
											try {
												await acceptFriend(request.id)
												toast.success('Друг добавлен 🎉')
											} catch {
												toast.error('Ошибка')
											}
										}}
										className='flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 transition text-white text-sm'
									>
										<Check size={16} />
										Принять
									</button>

									<button
										onClick={async () => {
											try {
												await rejectFriend(request.id)
												toast('Заявка отклонена', { icon: '❌' })
											} catch {
												toast.error('Ошибка')
											}
										}}
										className='flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm'
									>
										<X size={16} />
										Отклонить
									</button>
								</div>
							</div>
						))}
				</div>

				{/* empty state */}
				{requests?.filter(r => r.status === FriendStatus.PENDING).length ===
					0 && (
					<div className='text-center text-white/40 py-6'>
						Нет входящих заявок
					</div>
				)}
			</div>
		</div>
	)
}
