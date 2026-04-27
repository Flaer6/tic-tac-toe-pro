import { Check, User, UserPlus, X } from 'lucide-react'
import { useProfile } from '../../../../../hooks/useProfile'

export const Requests = () => {
	const {
		acceptFriend,
		rejectFriend,
		isAccepting,
		isRejecting,
		pendingRequests,
	} = useProfile()

	return (
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
	)
}
