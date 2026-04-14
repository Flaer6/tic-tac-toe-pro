import clsx from 'clsx'
import { motion } from 'framer-motion'
import { NavLink, Outlet } from 'react-router-dom'
import { useGetProfile } from '../../../hooks/useGetUser'
import { useProfile } from '../../../hooks/useProfile'
import { tabsProfile } from './tabs.data'

export const Profile = () => {
	const { getFriends } = useProfile()
	const { data } = useGetProfile()

	return (
		<div className='p-10'>
			<div className='flex flex-col items-center h-full w-full'>
				<div className='bg-gradient py-5 rounded-2xl'>
					<div className='border-b border-b-white/20'>
						<div className='w-full p-2 inline-flex gap-4  justify-start px-5'>
							<div className=''>
								<img
									className='max-w-20 rounded-xl'
									src='/assets/favicons/512x512.jpg'
									alt=''
								/>
							</div>
							<div className='flex flex-col justify-between'>
								<div className=''>
									<div className='text-xl'>{data?.username}</div>
									<div className='text-primary text-xs'>{data?.publicId}</div>
								</div>
								<span className='text-xs text-primary flex items-center gap-2.5'>
									Дата создания: <span className='text-white'>1.1.2026</span>
									<span>
										Друзей:
										<span className='text-white'>{getFriends?.length}</span>
									</span>
								</span>
							</div>
						</div>
					</div>
					<div className='border-b border-white/10'>
						<div className='flex items-center gap-2 px-4'>
							{tabsProfile.map((tab, index) => (
								<NavLink
									to={tab.href}
									end={tab.href === ''}
									key={index}
									className={({ isActive }) =>
										clsx(
											'relative px-6 py-4 text-sm transition hover:bg-white/5',
											isActive
												? 'text-white'
												: 'text-white/60 hover:text-white',
										)
									}
								>
									{({ isActive }) => (
										<>
											<span className='relative z-10'>{tab.name}</span>

											{isActive && (
												<motion.div
													layoutId='underline'
													className='absolute bottom-0 left-0 w-full h-[2px] bg-green-400'
													transition={{
														type: 'spring',
														stiffness: 400,
														damping: 30,
													}}
												/>
											)}
										</>
									)}
								</NavLink>
							))}
						</div>
					</div>
				</div>
				<div className='bg-gradient w-full rounded-2xl p-2 mt-3'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
