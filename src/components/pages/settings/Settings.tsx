import cn from 'clsx'
import { SettingsIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import { settingsTabs } from './tabs.data'

export const Settings = () => {
	return (
		<div className='mx-auto w-full max-w-7xl p-4 pt-14 md:p-6 xl:p-8'>
			{/* HEADER */}
			<h1 className='mb-6 flex items-center gap-3 text-2xl font-bold text-white'>
				<SettingsIcon className='h-6 w-6 text-emerald-400' />
				Настройки
			</h1>

			<div className='overflow-hidden rounded-3xl border border-white/10 bg-card'>
				<div className='flex flex-col lg:flex-row'>
					{/* MOBILE TABS */}
					<div className='border-b border-white/10 bg-inner lg:hidden'>
						<div className='scrollbar-none flex gap-2 overflow-x-auto px-3 py-3'>
							{settingsTabs.map(tab => (
								<NavLink
									key={tab.href}
									to={tab.href}
									end
									className={({ isActive }) =>
										cn(
											'flex shrink-0 items-center gap-2 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-all',
											{
												'border-emerald-400/20 bg-white/5 text-white': isActive,
												'hover:bg-white/5 hover:text-white': !isActive,
											},
										)
									}
								>
									{tab.icon && <tab.icon className='h-4 w-4 shrink-0' />}
									<span className='whitespace-nowrap'>{tab.name}</span>
								</NavLink>
							))}
						</div>
					</div>

					{/* DESKTOP SIDEBAR */}
					<div className='hidden w-72 shrink-0 border-r border-white/10 bg-inner lg:block '>
						<div className='p-3 space-y-1'>
							{settingsTabs.map(tab => (
								<NavLink
									key={tab.href}
									to={tab.href}
									end
									className={({ isActive }) =>
										cn(
											'flex items-center gap-3 rounded-2xl border border-transparent px-5 py-4 text-sm font-medium text-muted-foreground transition-all',
											{
												'border-emerald-400/20 bg-white/5 text-white': isActive,
												'hover:bg-white/5 hover:text-white': !isActive,
											},
										)
									}
								>
									{tab.icon && <tab.icon className='h-5 w-5 shrink-0' />}
									{tab.name}
								</NavLink>
							))}
						</div>
					</div>

					{/* CONTENT */}
					<div className='min-w-0 flex-1 p-4 sm:p-6'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	)
}
