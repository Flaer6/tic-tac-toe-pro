import { UserPlus } from 'lucide-react'
import { useProfile } from '../../../../../hooks/useProfile'
import { Requests } from './Requests'

export const FriendRequests = () => {
	const { pendingRequests } = useProfile()

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

				<Requests />
			</div>
		</div>
	)
}
