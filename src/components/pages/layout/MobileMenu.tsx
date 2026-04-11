import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileStatus } from '../../ui/forms/ProfileStatus'
import { Logo } from '../../ui/Logo'
import { menuData } from './menu.data'

export const MobileMenu = () => {
	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<div className='min-[790px]:hidden'>
			<button
				className='absolute top-2 left-2 w-8 z-20'
				type='button'
				onClick={() => setIsActive(!isActive)}
			>
				{!isActive ? (
					<Menu className='w-full h-full' />
				) : (
					<X className='w-full h-full' />
				)}
			</button>
			<nav
				className={`h-full bg-gradient backdrop-blur-3xl border-t border-white/10  absolute left-0 top-0 z-19 pr-3 flex flex-col justify-between  transition-transform duration-200 ease-in-out ${isActive ? 'translate-x-0' : '-translate-x-full'}`}
				onClick={() => setIsActive(false)}
			>
				<ul>
					<div className='pl-15 mb-10 text-right'>
						<Logo className='' />
					</div>
					{menuData.map((item, index) => (
						<li key={index}>
							<Link
								to={item.href}
								className='flex items-center gap-3 text-xl py-3 active:bg-white/40 p-3'
							>
								<item.icon />
								{item.name}
							</Link>
						</li>
					))}
				</ul>
				<ProfileStatus />
			</nav>
		</div>
	)
}
