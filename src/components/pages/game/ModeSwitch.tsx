// ModeSwitch.tsx
import cn from 'clsx'
import { NavLink } from 'react-router-dom'

interface Mode {
	to: string
	end: boolean
	label: string
	description?: string
}

interface ModeSwitchProps {
	modes: Mode[]
}

export const ModeSwitch = ({ modes }: ModeSwitchProps) => {
	return (
		<div className='flex items-center gap-1 rounded-2xl border border-white/8 bg-white/3 p-1 backdrop-blur-sm'>
			{modes.map(mode => (
				<NavLink
					key={mode.to}
					to={mode.to}
					end={mode.end}
					className={({ isActive }) =>
						cn(
							'rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200',
							isActive
								? 'bg-indigo-500/20 border border-indigo-500/30 text-white'
								: 'text-white/30 hover:text-white/60',
						)
					}
				>
					{mode.label}
				</NavLink>
			))}
		</div>
	)
}
