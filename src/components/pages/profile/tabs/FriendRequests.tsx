import { Check, User, UserPlus, X } from 'lucide-react'
import { useProfile } from '../../../../hooks/useProfile'
import { FriendStatus } from '../../../../types/types'

export const FriendRequests = () => {
	const { requests, acceptFriend, rejectFriend, isAccepting, isRejecting } =
		useProfile()

	const pendingRequests =
		requests?.filter(r => r.status === FriendStatus.PENDING) ?? []

	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			<div className='mb-6 flex flex-col gap-2 sm:mb-8'>
				<h2 className='text-2xl font-semibold text-white sm:text-3xl'>
					Заявки в друзья
				</h2>
				<p className='text-sm text-white/50 sm:text-base'>
					Здесь отображаются входящие заявки, которые можно принять или
					отклонить
				</p>
			</div>

			<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6'>
				<div className='mb-4 flex items-center justify-between gap-3'>
					<div className='flex items-center gap-2 text-white/80'>
						<UserPlus className='h-5 w-5 text-white/50' />
						<span className='text-sm font-medium sm:text-base'>
							Входящие заявки
						</span>
					</div>

					<span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 sm:text-sm'>
						{pendingRequests.length}
					</span>
				</div>

				<div className='max-h-[420px] space-y-3 overflow-y-auto pr-1 sm:pr-2'>
					{pendingRequests.length > 0 ? (
						pendingRequests.map(request => (
							<div
								key={request.id}
								className='rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10 sm:p-4 flex items-center justify-between max-sm:flex-col max-sm:items-start'
							>
								<div className='flex items-start gap-3 sm:items-center sm:gap-4'>
									<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
										<User className='h-5 w-5 text-white/70 sm:h-6 sm:w-6' />
									</div>

									<div className='min-w-0 flex-1'>
										<div className='truncate text-sm font-medium text-white sm:text-base'>
											{request.from?.username}
										</div>
										<div className='truncate text-xs text-white/50 sm:text-sm'>
											ID: {request.from?.publicId}
										</div>
									</div>
								</div>

								<div className='mt-3 flex gap-2 max-sm:w-full max-sm:flex-col'>
									<button
										type='button'
										onClick={() => acceptFriend(request.id)}
										className='inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 '
										disabled={isAccepting}
									>
										<Check size={16} />
										Принять
									</button>

									<button
										type='button'
										onClick={() => rejectFriend(request.id)}
										className='inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600 '
										disabled={isRejecting}
									>
										<X size={16} />
										Отклонить
									</button>
								</div>
							</div>
						))
					) : (
						<div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center'>
							<div className='mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5'>
								<UserPlus className='h-7 w-7 text-white/30' />
							</div>
							<div className='text-base font-medium text-white/80'>
								Нет входящих заявок
							</div>
							<div className='mt-1 max-w-sm text-sm text-white/45'>
								Когда кто-то отправит тебе заявку в друзья, она появится здесь
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
