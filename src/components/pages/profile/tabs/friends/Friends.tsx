import { motion } from 'framer-motion'
import { Plus, Search, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
	useGetMeQuery,
	useSearchUserLazyQuery,
	useSendFriendRequestMutation,
} from '../../../../../graphql/generated/output'
import type { IInputSearchUser } from '../../../../../types/types'
import { SubmitButton } from '../../../../ui/buttons/Submit.btn'
import { InputAuth } from '../../../../ui/inputs/InputAuth'
import { FriendsList } from './FriendsList'

export const Friends = () => {
	const [searchUser, { data, error: userError }] = useSearchUserLazyQuery()
	const { data: getMe } = useGetMeQuery()
	const [sendFriendRequest, { data: isAddFriend, error: friendError }] =
		useSendFriendRequestMutation()

	const { handleSubmit, register } = useForm<IInputSearchUser>()

	const onSearch = async (formData: IInputSearchUser) => {
		await searchUser({
			variables: { input: { identifier: formData.identifier } },
		})
	}

	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			{/* Header */}
			<div className='mb-7'>
				<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
					Социальное
				</p>
				<h2 className='text-2xl font-bold text-white sm:text-3xl'>Друзья</h2>
			</div>

			<div className='relative overflow-hidden rounded-3xl border border-white/6 bg-white/2 backdrop-blur-xl'>
				<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent' />

				{/* Search section */}
				<div className='border-b border-white/5 p-5 md:p-6'>
					<form onSubmit={handleSubmit(onSearch)}>
						<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
							<div className='relative w-full'>
								<div className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25'>
									<Search size={16} />
								</div>
								<InputAuth
									placeholder='Введите ID или username'
									className='w-full pl-10'
									{...register('identifier')}
								/>
							</div>
							<SubmitButton className='w-full py-3 sm:w-auto sm:min-w-[110px]'>
								Найти
							</SubmitButton>
						</div>
					</form>

					{/* Search result / feedback */}
					<div className='mt-3'>
						{data && (
							<motion.div
								initial={{ opacity: 0, y: -6 }}
								animate={{ opacity: 1, y: 0 }}
								className='flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between'
							>
								<Link
									to={`/user/${data.searchUser.id}`}
									className='flex min-w-0 items-center gap-3'
								>
									<div className='relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10'>
										<img
											src={
												data.searchUser.avatar || '/assets/favicons/512x512.jpg'
											}
											alt='avatar'
											className='h-full w-full object-cover'
										/>
									</div>
									<div className='min-w-0'>
										<div className='truncate text-sm font-semibold text-white'>
											{data.searchUser.username}
										</div>
										<div className='text-xs text-white/40'>
											#{data.searchUser.publicId}
										</div>
									</div>
								</Link>
								<button
									type='button'
									onClick={() =>
										sendFriendRequest({
											variables: { input: { toId: data.searchUser.id } },
										})
									}
									className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500/90 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-500 sm:w-auto'
								>
									<Plus size={14} />
									Добавить
								</button>
							</motion.div>
						)}

						{userError && (
							<p className='rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center text-xs text-white/35'>
								По вашему запросу никого не найдено
							</p>
						)}

						{isAddFriend && (
							<p className='rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-center text-xs font-medium text-emerald-400'>
								Заявка отправлена ✓
							</p>
						)}

						{friendError?.message && (
							<p className='rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-center text-xs font-medium text-red-400'>
								{friendError.message}
							</p>
						)}
					</div>
				</div>

				{/* Friends list header */}
				<div className='flex items-center justify-between px-5 py-4 md:px-6'>
					<div className='flex items-center gap-2 text-white/60'>
						<Users className='h-4 w-4 text-white/25' />
						<span className='text-sm font-medium'>Список друзей</span>
					</div>
					<span className='rounded-xl border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white/40'>
						{getMe?.getFriends?.length ?? 0}
					</span>
				</div>

				{/* Friends list */}
				<div className='px-5 pb-5 md:px-6 md:pb-6'>
					<FriendsList />
				</div>
			</div>
		</div>
	)
}
