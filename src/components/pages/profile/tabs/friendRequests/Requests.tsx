import { Check, UserPlus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {
	useAcceptFriendRequestMutation,
	useGetMeQuery,
	useRejectFriendRequestMutation,
} from '../../../../../graphql/generated/output'
import { FriendStatus } from '../../../../../types/types'

export const Requests = () => {
	const { data } = useGetMeQuery()

	const [AcceptFriendRequest, { loading: isAccepting }] =
		useAcceptFriendRequestMutation({ refetchQueries: ['GetMe'] })

	const [RejectFriendRequest, { loading: isRejecting }] =
		useRejectFriendRequestMutation({ refetchQueries: ['GetMe'] })

	const pendingRequests =
		data?.getFriendRequests?.filter(r => r.status === FriendStatus.PENDING) ??
		[]

	return (
		<div className='max-h-[420px] space-y-3 overflow-y-auto pr-1 sm:pr-2'>
			{pendingRequests.length > 0 ? (
				pendingRequests.map(request => (
					<div
						key={request.id}
						className='flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10 max-sm:flex-col max-sm:items-start sm:p-4'
					>
						<Link
							to={`/user/${request.from?.id}`}
							className='flex items-start gap-3 transition-opacity hover:opacity-80 sm:items-center sm:gap-4'
						>
							<div className='flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-md shadow-black/20'>
								<img
									src={request.from?.avatar || '/assets/favicons/512x512.jpg'}
									alt='avatar'
									className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
								/>
							</div>

							<div className='min-w-0 flex-1'>
								<div className='truncate text-sm font-medium text-white sm:text-base'>
									{request.from?.username}
								</div>

								<div className='truncate text-xs text-white/50 sm:text-sm'>
									ID: {request.from?.id}
								</div>
							</div>
						</Link>

						<div className='mt-3 flex gap-2 max-sm:w-full max-sm:flex-col'>
							<button
								type='button'
								onClick={() => {
									AcceptFriendRequest({
										variables: {
											input: {
												requestId: request.id,
											},
										},
									})

									toast.success('Друг добавлен 🎉')
								}}
								className='inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600'
								disabled={isAccepting}
							>
								<Check size={16} />
								Принять
							</button>

							<button
								type='button'
								onClick={() => {
									RejectFriendRequest({
										variables: {
											input: {
												requestId: request.id,
											},
										},
									})

									toast('Заявка отклонена', {
										icon: '❌',
									})
								}}
								className='inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600'
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
