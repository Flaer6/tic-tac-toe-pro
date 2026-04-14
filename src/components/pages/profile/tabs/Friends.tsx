//

import { Plus, Trash, User } from 'lucide-react'
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
		<div className='p-6 max-w-2xl'>
			{/* HEADER */}
			<h2 className='text-2xl font-semibold text-white mb-6'>Друзья</h2>

			{/* SEARCH */}
			<div className='mb-8'>
				<form onSubmit={handleSubmit(onSearch)}>
					<div className='flex items-center gap-10'>
						<InputAuth
							placeholder='Id or Username'
							{...register('identifier')}
						/>
						<SubmitButton className='py-1.5'>Найти</SubmitButton>
					</div>
				</form>
			</div>
			<div className='overflow-y-auto pr-2 max-h-[400px]'>
				{/* SEARCH RESULT */}
				<div className='mb-10'>
					{userSuccess && user && (
						<div className='flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10'>
							<div className='flex items-center gap-4'>
								<div className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center'>
									<User className='w-5 h-5 text-white/70' />
								</div>

								<div className='flex flex-col'>
									<span className='text-white'>{user.username}</span>
									<span className='text-white/50 text-sm'>
										ID: {user.publicId}
									</span>
								</div>
							</div>

							<button
								onClick={() => addFriend(user.id)}
								className='flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition text-white text-sm font-medium'
							>
								<Plus size={16} />
								Добавить
							</button>
						</div>
					)}

					{/* states */}
					{userError && (
						<div className='text-center text-white/50 mt-4'>
							По вашему запросу ничего не найдено
						</div>
					)}

					{isAddFriend && (
						<div className='text-green-400 mt-4 text-center'>
							Заявка отправлена ✅
						</div>
					)}

					{friendError && (
						<div className='text-red-400 mt-4 text-center'>{messages}</div>
					)}
				</div>
				{/* FRIENDS LIST */}
				<div className='space-y-3'>
					{getFriends?.map(friend => (
						<div
							key={friend.id}
							className='group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
						>
							{/* avatar */}
							<div className='relative'>
								<div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center'>
									<User className='w-6 h-6 text-white/70' />
								</div>
							</div>

							{/* info */}
							<div className='flex flex-col'>
								<span className='text-white font-medium'>
									{friend.username}
								</span>

								<span className='text-white/50 text-sm'>
									ID: {friend.publicId}
								</span>
							</div>

							{/* actions */}
							<button
								className='ml-auto opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-500'
								type='button'
								onClick={() => friendRemove(friend.id)}
							>
								<Trash size={18} />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
