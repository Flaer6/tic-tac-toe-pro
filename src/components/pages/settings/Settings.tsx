import cn from 'clsx'
import { SettingsIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { settingsTabs } from './tabs.data'

export const Settings = () => {
	return (
		<div className='mx-auto w-full max-w-7xl p-4 pt-14 md:p-6 xl:p-8'>
			{/* Header */}
			<div className='mb-7'>
				<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
					Аккаунт
				</p>
				<h1 className='flex items-center gap-2.5 text-2xl font-bold text-white sm:text-3xl'>
					<SettingsIcon className='h-5 w-5 text-indigo-400' />
					Настройки
				</h1>
			</div>

			<div className='relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl'>
				{/* Top gradient line */}
				<div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />

				<div className='flex flex-col lg:flex-row'>
					{/* Mobile tabs */}
					<div className='border-b border-white/[0.05] lg:hidden'>
						<div className='scrollbar-none flex gap-1.5 overflow-x-auto px-3 py-3'>
							{settingsTabs.map(tab => (
								<NavLink
									key={tab.href}
									to={tab.href}
									end
									className={({ isActive }) =>
										cn(
											'relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200',
											isActive
												? 'bg-indigo-500/15 text-white'
												: 'text-white/35 hover:bg-white/[0.04] hover:text-white/70',
										)
									}
								>
									{({ isActive }) => (
										<>
											{isActive && (
												<span className='absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-indigo-400' />
											)}
											{tab.icon && (
												<tab.icon className='h-3.5 w-3.5 shrink-0' />
											)}
											<span className='whitespace-nowrap'>{tab.name}</span>
										</>
									)}
								</NavLink>
							))}
						</div>
					</div>

					{/* Desktop sidebar */}
					<div className='hidden w-64 shrink-0 border-r border-white/[0.05] lg:block'>
						<div className='p-3'>
							{settingsTabs.map(tab => (
								<NavLink
									key={tab.href}
									to={tab.href}
									end
									className={({ isActive }) =>
										cn(
											'group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
											isActive
												? 'bg-indigo-500/15 text-white'
												: 'text-white/35 hover:bg-white/[0.04] hover:text-white/70',
										)
									}
								>
									{({ isActive }) => (
										<>
											{isActive && (
												<span className='absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-indigo-400' />
											)}
											{tab.icon && (
												<tab.icon
													className={cn(
														'h-4 w-4 shrink-0 transition-colors duration-200',
														isActive
															? 'text-indigo-400'
															: 'text-white/25 group-hover:text-white/50',
													)}
												/>
											)}
											{tab.name}
										</>
									)}
								</NavLink>
							))}
						</div>
					</div>

					{/* Content */}
					<div className='min-w-0 flex-1 p-4 sm:p-6'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	)
}
