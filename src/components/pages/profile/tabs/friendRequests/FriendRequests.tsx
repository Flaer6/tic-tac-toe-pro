import { UserPlus } from 'lucide-react'
import { useGetMeQuery } from '../../../../../graphql/generated/output'
import { FriendStatus } from '../../../../../types/types'
import { Requests } from './Requests'

export const FriendRequests = () => {
	const { data } = useGetMeQuery()
	const pendingRequests =
		data?.getFriendRequests?.filter(r => r.status === FriendStatus.PENDING) ??
		[]

	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			{/* Header */}
			<div className='mb-7'>
				<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
					Социальное
				</p>
				<h2 className='text-2xl font-bold text-white sm:text-3xl'>
					Заявки в друзья
				</h2>
				<p className='mt-1.5 text-sm text-white/35'>
					Принимай или отклоняй входящие заявки
				</p>
			</div>

			<div className='relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl'>
				<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />

				{/* Section header */}
				<div className='flex items-center justify-between border-b border-white/[0.05] px-5 py-4 md:px-6'>
					<div className='flex items-center gap-2.5 text-white/60'>
						<UserPlus className='h-4 w-4 text-white/25' />
						<span className='text-sm font-medium'>Входящие заявки</span>
					</div>

					{pendingRequests.length > 0 && (
						<span className='rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400'>
							{pendingRequests.length}
						</span>
					)}
				</div>

				{/* List */}
				<div className='px-5 py-4 md:px-6 md:py-5'>
					<Requests />
				</div>
			</div>
		</div>
	)
}
