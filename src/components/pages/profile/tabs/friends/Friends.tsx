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
			variables: {
				input: {
					identifier: formData.identifier,
				},
			},
		})
	}
	console.log(userError?.message)

	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			<div className='mb-6 flex flex-col gap-2 sm:mb-8'>
				<h2 className='text-2xl font-semibold text-white sm:text-3xl'>
					Друзья
				</h2>
			</div>

			<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6'>
				<div className='mb-6 sm:mb-8'>
					<form onSubmit={handleSubmit(onSearch)}>
						<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
							<div className='relative w-full'>
								<div className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35'>
									<Search size={18} />
								</div>

								<InputAuth
									placeholder='Введите ID или username'
									className='w-full pl-11'
									{...register('identifier')}
								/>
							</div>

							<SubmitButton className='w-full py-3 sm:w-auto sm:min-w-[120px]'>
								Найти
							</SubmitButton>
						</div>
					</form>
				</div>

				<div className='mb-6 max-h-[400px] sm:mb-8'>
					{data && (
						<div className='flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:flex-row sm:items-center sm:justify-between'>
							<Link to={`/${data.searchUser.id}`}>
								<div className='flex min-w-0 items-center gap-3 sm:gap-4'>
									<div className='flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20'>
										<img
											src={
												data.searchUser.avatar || '/assets/favicons/512x512.jpg'
											}
											alt='avatar'
											className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
										/>
									</div>

									<div className='min-w-0'>
										<div className='truncate text-base font-medium text-white sm:text-lg'>
											{data.searchUser.username}
										</div>
										<div className='text-sm text-white/50'>
											ID: {data.searchUser.publicId}
										</div>
									</div>
								</div>
							</Link>
							<button
								type='button'
								onClick={() =>
									sendFriendRequest({
										variables: {
											input: {
												toId: data.searchUser.id,
											},
										},
									})
								}
								className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 sm:w-auto z-20'
							>
								<Plus size={16} />
								Добавить
							</button>
						</div>
					)}

					{userError && (
						<div className='rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-5 text-center text-sm text-white/50 sm:text-base'>
							По вашему запросу ничего не найдено
						</div>
					)}

					{isAddFriend && (
						<div className='rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-5 text-center text-sm text-emerald-400 sm:text-base'>
							Заявка отправлена ✅
						</div>
					)}

					{friendError && friendError.message && (
						<div className='rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-5 text-center text-sm text-red-400 sm:text-base'>
							{friendError.message}
						</div>
					)}
				</div>

				<div className='mb-4 flex items-center justify-between gap-3'>
					<div className='flex items-center gap-2 text-white/80'>
						<Users className='h-5 w-5 text-white/50' />
						<span className='text-sm font-medium sm:text-base'>
							Список друзей
						</span>
					</div>

					<span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 sm:text-sm'>
						{getMe?.getFriends?.length ?? 0}
					</span>
				</div>

				<FriendsList />
			</div>
		</div>
	)
}
