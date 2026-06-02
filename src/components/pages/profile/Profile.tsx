import clsx from 'clsx'
import { motion } from 'framer-motion'
import { NavLink, Outlet } from 'react-router-dom'
import { HeaderProfile } from './HeaderProfile'
import { tabsProfile } from './tabs.data'

export const Profile = () => {
	return (
		<div className='w-full p-4 pt-14 md:p-6 xl:p-8'>
			<div className='mx-auto flex w-full max-w-7xl flex-col gap-4'>
				<div className='overflow-hidden bg-card'>
					<HeaderProfile />

					<div className='border-t border-white/10 bg-black/10'>
						<div className='relative'>
							<div className='scrollbar-none flex snap-x snap-mandatory items-center gap-1 overflow-x-auto px-2 md:justify-center md:px-4'>
								{tabsProfile.map((tab, index) => {
									const Icon = tab.icon

									return (
										<NavLink
											to={tab.href}
											end={tab.href === ''}
											key={index}
											className={({ isActive }) =>
												clsx(
													'relative flex snap-start items-center gap-2 whitespace-nowrap rounded-t-2xl px-4 py-4 text-sm font-medium transition md:px-5',
													isActive
														? 'text-white'
														: 'text-white/50 hover:bg-white/5 hover:text-white/80',
												)
											}
										>
											{({ isActive }) => (
												<>
													<span className='relative z-10 flex items-center gap-2'>
														<Icon className='size-4 shrink-0' />
														{tab.name}
													</span>

													{isActive && (
														<>
															<motion.div
																layoutId='profileTabBg'
																className='absolute inset-0 rounded-t-2xl bg-white/5'
																transition={{
																	type: 'spring',
																	stiffness: 380,
																	damping: 32,
																}}
															/>

															<motion.div
																layoutId='profileUnderline'
																className='absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-emerald-400'
																transition={{
																	type: 'spring',
																	stiffness: 400,
																	damping: 30,
																}}
															/>
														</>
													)}
												</>
											)}
										</NavLink>
									)
								})}
							</div>
						</div>
					</div>
				</div>

				<div className='flex justify-center bg-card p-3 md:p-4'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
