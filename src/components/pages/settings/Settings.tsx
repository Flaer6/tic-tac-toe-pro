import cn from 'clsx'
import { SettingsIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { settingsTabs } from './tabs.data'

export const Settings = () => {
	return (
		<div className='mx-auto w-full max-w-7xl p-4 pt-14 md:p-6 xl:p-8'>
			<h1 className='mb-6 flex items-center gap-2 text-2xl font-bold'>
				<SettingsIcon className='h-6 w-6' />
				Настройки
			</h1>

			<div className='flex overflow-hidden rounded-2xl border border-white/10 bg-card'>
				<div className='w-72 border-r  bg-inner'>
					{settingsTabs.map(tab => (
						<NavLink
							key={tab.href}
							to={tab.href}
							end
							className={({ isActive }) =>
								cn(
									'flex items-center gap-3 border-transparent px-6 py-4 text-sm font-medium text-muted-foreground transition-all border-r hover:bg-white/5 hover:text-white',
									{
										' border-r-emerald-400 bg-white/5 text-white': isActive,
									},
								)
							}
						>
							{tab.icon && <tab.icon className='h-5 w-5' />}
							{tab.name}
						</NavLink>
					))}
				</div>

				<div className='flex-1 p-6'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
