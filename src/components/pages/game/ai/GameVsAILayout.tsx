// GameVsAILayout.tsx
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ModeSwitch } from '../ModeSwitch'
import { aiModes } from '../mode.data'

export const GameVsAILayout = () => {
	const { pathname } = useLocation()
	const current = aiModes.find(m => m.to === pathname)

	return (
		<div className='flex flex-col items-center justify-center gap-4 px-2 h-screen'>
			<ModeSwitch modes={aiModes} />

			{current && (
				<p className='text-xs text-white/25 tracking-wide'>
					{current.description}
				</p>
			)}

			<Outlet />

			<NavLink
				to='/'
				className='text-xs text-white/20 hover:text-white/50 transition-colors duration-200 tracking-widest uppercase'
			>
				← Главное меню
			</NavLink>
		</div>
	)
}
