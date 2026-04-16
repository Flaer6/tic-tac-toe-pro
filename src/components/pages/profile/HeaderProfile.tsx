import { LogOut, UserRoundPen, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetProfile } from '../../../hooks/useGetUser'
import { useProfile } from '../../../hooks/useProfile'
import { authService } from '../../../shared/services/authService'
import { ConfirmModal } from '../../ui/modals/ConfirmModal'

export const HeaderProfile = () => {
	const { getFriends } = useProfile()
	const { user, createAtUser } = useGetProfile()
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className='flex flex-col gap-6 p-4 md:p-6 xl:flex-row xl:items-center xl:justify-between'>
			<div className='flex min-w-0 items-center gap-4 md:gap-5'>
				<div className='shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 shadow-	s[0_0_30px_rgba(0,0,0,0.15)]'>
					<img
						className='h-20 w-20 rounded-xl object-cover md:h-24 md:w-24'
						src='/assets/favicons/512x512.jpg'
						alt='Avatar'
					/>
				</div>

				<div className='min-w-0'>
					<div className='flex flex-wrap items-center gap-3'>
						<h1 className='truncate text-2xl font-semibold text-white md:text-3xl'>
							{user?.username}
						</h1>

						<span className='rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300'>
							ID: {user?.publicId}
						</span>
					</div>

					<div className='mt-3 flex flex-wrap items-center gap-3 text-sm text-white/60'>
						<div className='rounded-xl border border-white/10 bg-white/5 px-3 py-2'>
							<span className='text-white/50'>Дата создания: </span>
							<span className='text-white'>{createAtUser}</span>
						</div>

						<div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2'>
							<Users className='h-4 w-4 text-white/50' />
							<span className='text-white/50'>Друзей:</span>
							<span className='font-medium text-white'>
								{getFriends?.length ?? 0}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='flex w-full flex-col gap-3 sm:flex-row xl:w-auto'>
				<Link
					to='/Editor'
					className='inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 active:translate-y-0'
				>
					<UserRoundPen className='h-5 w-5 text-white/70' />
					<span>Редактировать профиль</span>
				</Link>

				<button
					type='button'
					onClick={() => setIsOpen(true)}
					className='inline-flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20'
				>
					<LogOut className='h-5 w-5' />
					<span>Выйти</span>
				</button>
				<ConfirmModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					onConfirm={authService.logout}
					title='Выход'
					description='Вы уверены, что хотите выйти из аккаунта?'
					confirmText='Выйти'
				/>
			</div>
		</div>
	)
}
