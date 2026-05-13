import { useParams } from 'react-router-dom'
import {
	useGetUserHistoryQuery,
	useGetUserQuery,
} from '../../../../graphql/generated/output'
import { UserProfileHeader } from './UserProfileHeader'
import { UserProfileHistory } from './UserProfileHistory'

export function UserProfile() {
	const { id } = useParams<{ id: string }>()

	const { data, loading } = useGetUserQuery({ variables: { id: id! } })

	const { data: userHistory } = useGetUserHistoryQuery({
		variables: { id: id! },
	})

	const user = data?.getUser

	if (loading) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<p className='text-zinc-400'>Загрузка...</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen w-full p-4 pt-16 md:p-6 xl:p-8'>
			<div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
				<UserProfileHeader data={user} />
				<div className='grid gap-6 xl:grid-cols-[1fr_350px]'>
					<UserProfileHistory data={userHistory?.getUserHistory} userId={id} />

					<div className='flex flex-col gap-6'>
						<div className='rounded-[32px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-6'>
							<h2 className='mb-5 text-xl font-semibold text-white'>
								Информация
							</h2>

							<div className='flex flex-col gap-4'>
								<div>
									<p className='mb-1 text-sm text-zinc-500'>Имя</p>

									<p className='text-white'>
										{user?.firstName || 'Не указано'}
									</p>
								</div>

								<div>
									<p className='mb-1 text-sm text-zinc-500'>Фамилия</p>

									<p className='text-white'>{user?.lastName || 'Не указано'}</p>
								</div>

								<div>
									<p className='mb-1 text-sm text-zinc-500'>Дата регистрации</p>

									<p className='text-white'>
										{user?.createdAt
											? new Date(user.createdAt).toLocaleDateString('ru-RU')
											: 'Неизвестно'}
									</p>
								</div>
							</div>
						</div>

						<div className='rounded-[32px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-6'>
							<h2 className='mb-5 text-xl font-semibold text-white'>
								Достижения
							</h2>

							<div className='flex flex-wrap gap-3'>
								<div className='rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm font-medium text-yellow-300'>
									🏆 Top Player
								</div>

								<div className='rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300'>
									⚡ Win Streak
								</div>

								<div className='rounded-2xl border border-pink-500/20 bg-pink-500/10 px-4 py-3 text-sm font-medium text-pink-300'>
									🎯 200 Wins
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
