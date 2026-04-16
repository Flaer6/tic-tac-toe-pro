import { Plus, Search, Trash2, User, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useProfile } from '../../../../hooks/useProfile'
import type { IInputSearchUser } from '../../../../types/types'
import { SubmitButton } from '../../../ui/buttons/Submit.btn'
import { InputAuth } from '../../../ui/inputs/InputAuth'

export const Friends = () => {
	const {
		getFriends,
		userSuccess,
		user,
		addFriend,
		userError,
		isAddFriend,
		friendError,
		messages,
		onSearch,
		friendRemove,
	} = useProfile()

	const { handleSubmit, register } = useForm<IInputSearchUser>()

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
					{userSuccess && user && (
						<div className='flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:flex-row sm:items-center sm:justify-between'>
							<div className='flex min-w-0 items-center gap-3 sm:gap-4'>
								<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5'>
									<User className='h-5 w-5 text-white/70' />
								</div>

								<div className='min-w-0'>
									<div className='truncate text-base font-medium text-white sm:text-lg'>
										{user.username}
									</div>
									<div className='text-sm text-white/50'>
										ID: {user.publicId}
									</div>
								</div>
							</div>

							<button
								type='button'
								onClick={() => addFriend(user.id)}
								className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 sm:w-auto'
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

					{friendError && messages && (
						<div className='rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-5 text-center text-sm text-red-400 sm:text-base'>
							{Array.isArray(messages) ? messages[0] : messages}
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
						{getFriends?.length ?? 0}
					</span>
				</div>

				<div className='max-h-[420px] space-y-3 overflow-y-auto pr-1 sm:pr-2'>
					{getFriends?.length ? (
						getFriends.map(friend => (
							<div
								key={friend.id}
								className='group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10 sm:gap-4 sm:p-4'
							>
								<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10'>
									<User className='h-5 w-5 text-white/70 sm:h-6 sm:w-6' />
								</div>

								<div className='min-w-0 flex-1'>
									<div className='truncate text-sm font-medium text-white sm:text-base'>
										{friend.username}
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
						))
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
			</div>
		</div>
	)
}
