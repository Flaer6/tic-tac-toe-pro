import { motion } from 'framer-motion'
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

	if (!pendingRequests.length) {
		return (
			<div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.01] px-4 py-12 text-center'>
				<div className='mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]'>
					<UserPlus className='h-5 w-5 text-white/20' />
				</div>
				<p className='text-sm font-medium text-white/50'>Нет входящих заявок</p>
				<p className='mt-1 text-xs text-white/25'>
					Заявки появятся здесь, когда кто-то добавит тебя в друзья
				</p>
			</div>
		)
	}

	return (
		<motion.div
			className='flex max-h-[420px] flex-col overflow-y-auto'
			initial='hidden'
			animate='show'
			variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
		>
			{pendingRequests.map(request => (
				<motion.div
					key={request.id}
					variants={{
						hidden: { opacity: 0, y: 5 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.25, ease: 'easeOut' },
						},
					}}
					className='group relative border-b border-white/[0.04] last:border-b-0 transition-colors duration-200 hover:bg-white/[0.03]'
				>
					{/* Left accent bar */}
					<div className='absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-indigo-500 opacity-40 transition-opacity duration-200 group-hover:opacity-70' />

					<div className='flex items-center gap-4 py-3.5 pl-5 pr-4'>
						{/* Avatar */}
						<Link
							to={`/user/${request.from?.id}`}
							className='relative shrink-0'
						>
							<div className='h-10 w-10 overflow-hidden rounded-xl border border-white/10'>
								<img
									src={request.from?.avatar || '/assets/favicons/512x512.jpg'}
									alt='avatar'
									className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
								/>
							</div>
						</Link>

						{/* Name */}
						<Link to={`/user/${request.from?.id}`} className='min-w-0 flex-1'>
							<div className='truncate text-sm font-semibold text-white/90'>
								{request.from?.username}
							</div>
							<div className='text-xs text-white/30'>
								#{request.from?.id?.slice(0, 8)}…
							</div>
						</Link>

						{/* Actions */}
						<div className='flex shrink-0 items-center gap-2'>
							<button
								type='button'
								disabled={isAccepting}
								onClick={() => {
									AcceptFriendRequest({
										variables: { input: { requestId: request.id } },
									})
									toast.success('Друг добавлен 🎉')
								}}
								className='inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 text-xs font-semibold text-emerald-400 transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/20 hover:text-emerald-300 disabled:opacity-40'
							>
								<Check size={13} />
								<span className='hidden sm:inline'>Принять</span>
							</button>

							<button
								type='button'
								disabled={isRejecting}
								onClick={() => {
									RejectFriendRequest({
										variables: { input: { requestId: request.id } },
									})
									toast('Заявка отклонена', { icon: '❌' })
								}}
								className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/5 text-red-400/60 transition-all duration-200 hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40'
							>
								<X size={14} />
							</button>
						</div>
					</div>
				</motion.div>
			))}
		</motion.div>
	)
}
