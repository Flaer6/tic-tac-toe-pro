import { LogOut, UserRoundPen, Users } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '../../../graphql/generated/output'
import { authService } from '../../../shared/services/authService'
import { useOnlineGameStore } from '../../../store/onlineGame.store'
import { userDate } from '../../../utils/createAtUser'
import { ConfirmModal } from '../../ui/modals/ConfirmModal'
import { AdminLabel } from '../../ui/status/AdminLabel'

export const HeaderProfile = () => {
	const { data, loading } = useGetMeQuery()
	const { onlineUsers } = useOnlineGameStore()
	const [isOpen, setIsOpen] = useState(false)

	const isOnline = data?.getMe.id && onlineUsers.includes(String(data.getMe.id))
	const createAtUser = userDate(data?.getMe.createdAt)

	const navigate = useNavigate()

	const handleLogout = async () => {
		await authService.logout()
		navigate('/', { replace: true })
	}
	return (
		<phantom-ui loading={loading}>
			<div className='relative overflow-hidden rounded-3xl border border-white/6 bg-white/2 backdrop-blur-xl'>
				{/* Top gradient line */}
				<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent' />

				{/* Ambient glow behind avatar */}
				<div className='pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-indigo-600/10 blur-[60px]' />

				<div className='relative flex flex-col gap-6 p-5 md:p-7 xl:flex-row xl:items-center xl:justify-between'>
					{/* Left: avatar + info */}
					<div className='flex min-w-0 items-center gap-5'>
						{/* Avatar */}
						<div className='relative shrink-0'>
							<div className='h-20 w-20 overflow-hidden rounded-2xl border border-white/10 ring-2 ring-indigo-500/20 md:h-24 md:w-24'>
								<img
									className='h-full w-full object-cover'
									src={data?.getMe?.avatar || '/assets/favicons/512x512.jpg'}
									alt='Avatar'
								/>
							</div>
							{/* Online dot */}
							<span
								className={`
								absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#070B14]
								transition-all duration-300
								${
									isOnline
										? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
										: 'bg-zinc-600'
								}
							`}
							/>
						</div>

						{/* Text */}
						<div className='min-w-0'>
							{/* Name row */}
							<div className='flex flex-wrap items-center gap-2.5'>
								<h1 className='truncate text-2xl font-bold text-white md:text-3xl'>
									{data?.getMe?.username}
								</h1>

								<span className='rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300'>
									#{data?.getMe?.publicId}
								</span>

								<span
									className={`
									rounded-lg border px-2 py-0.5 text-xs font-medium
									${
										isOnline
											? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
											: 'border-white/[0.07] bg-white/4 text-white/30'
									}
								`}
								>
									{isOnline ? 'В сети' : 'Не в сети'}
								</span>
								{data?.getMe.role == 'ADMIN' && <AdminLabel />}
							</div>

							{/* Full name */}
							{(data?.getMe?.firstName || data?.getMe?.lastName) && (
								<p className='mt-0.5 text-sm text-white/40'>
									{data?.getMe?.firstName} {data?.getMe?.lastName}
								</p>
							)}

							{/* Meta row */}
							<div className='mt-3 flex flex-wrap items-center gap-2'>
								<div className='flex items-center gap-1.5 rounded-xl border border-white/6 bg-white/3 px-3 py-1.5'>
									<span className='text-xs text-white/30'>С нами с</span>
									<span className='text-xs font-medium text-white/70'>
										{createAtUser}
									</span>
								</div>

								<div className='flex items-center gap-1.5 rounded-xl border border-white/6 bg-white/3 px-3 py-1.5'>
									<Users className='h-3.5 w-3.5 text-white/25' />
									<span className='text-xs text-white/30'>Друзей:</span>
									<span className='text-xs font-semibold text-white/70'>
										{data?.getFriends?.length ?? 0}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right: actions */}
					<div className='flex w-full flex-col gap-2 sm:flex-row xl:w-auto'>
						<Link
							to='/settings'
							className='inline-flex items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/4 px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07] hover:text-white active:translate-y-0'
						>
							<UserRoundPen className='h-4 w-4 text-white/50' />
							Редактировать профиль
						</Link>

						<button
							type='button'
							onClick={() => setIsOpen(true)}
							className='inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/15 bg-red-500/[0.07] px-5 py-2.5 text-sm font-medium text-red-400/80 transition-all duration-200 hover:border-red-500/25 hover:bg-red-500/12 hover:text-red-400'
						>
							<LogOut className='h-4 w-4' />
							Выйти
						</button>
					</div>
				</div>

				<ConfirmModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					onConfirm={handleLogout}
					title='Выход'
					description='Вы уверены, что хотите выйти из аккаунта?'
					confirmText='Выйти'
				/>
			</div>
		</phantom-ui>
	)
}
