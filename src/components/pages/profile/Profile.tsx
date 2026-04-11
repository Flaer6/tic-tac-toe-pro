import { useProfile } from '../../../hooks/useProfile'
import { FriendStatus } from '../../../types/types'
import { SubmitButton } from '../../ui/buttons/Submit.btn'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const Profile = () => {
	const {
		handleSubmit,
		onSearch,
		register,
		userSuccess,
		userError,
		user,
		addFriend,
		isAddFriend,
		friendError,
		messages,
		rejectFriend,
		requests,
		acceptFriend,
		getFriends,
	} = useProfile()
	return (
		<div className='bg-gradient p-24 rounded-2xl'>
			<form onSubmit={handleSubmit(onSearch)}>
				<div className='flex items-center gap-10'>
					<InputAuth placeholder='Id or Username' {...register('identifier')} />
					<SubmitButton>Найти</SubmitButton>
				</div>
			</form>

			<div className='pt-20'>
				{userSuccess && user ? (
					<div className='flex items-center justify-between bg-black/30 py-2 px-6 rounded-4xl'>
						<div className='flex flex-col'>
							<span>{user.username}</span>
							<span>{user.publicId}</span>
						</div>

						<button type='button' onClick={() => addFriend(user.id)}>
							Добавить
						</button>
					</div>
				) : userError ? (
					<div>По вашему запросу ничего не найдено</div>
				) : isAddFriend ? (
					<div className=''>Заявка создана</div>
				) : null}
				{friendError && <div>{messages}</div>}
			</div>
			<div className=' mt-8 flex items-start gap-5'>
				<div className='bg-gradient p-6 rounded-4xl w-full'>
					<div className=''>
						<span>Заявки:</span>
						<div className='flex flex-col gap-5 pt-3'>
							{requests
								?.filter(r => r.status == FriendStatus.PENDING)
								.map(request => (
									<div className='bg-black/15 p-3 rounded-3xl' key={request.id}>
										<div className=''>
											<div>{request.from?.username}</div>
											<div>{request.from?.publicId}</div>
										</div>
										<div className='pt-2.5 flex items-center gap-5'>
											<div className='text-blue-400'>
												<button
													type='button'
													onClick={() => acceptFriend(request.id)}
												>
													Принять
												</button>
											</div>
											<div className='text-red-400'>
												<button
													type='button'
													onClick={() => rejectFriend(request.id)}
												>
													Отклонить
												</button>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className='bg-gradient p-6 rounded-4xl	w-full'>
					<div className=''>
						<span>Друзья:</span>
						{getFriends?.map(friend => (
							<div className='' key={friend.id}>
								<div className=''>{friend.username}</div>
								<div className=''>{friend.publicId}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
