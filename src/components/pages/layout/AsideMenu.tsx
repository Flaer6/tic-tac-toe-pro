import cn from 'clsx'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProfileStatus } from '../../ui/forms/ProfileStatus'
import { Logo } from '../../ui/Logo'
import { menuData } from './menu.data'

export const AsideMenu = () => {
	const [isActive, setIsActive] = useState<boolean>(false)
	return (
		<aside className='relative h-screen bg-white/10 p-2 max-w-56 w-fit flex flex-col justify-between max-[970px]:items-center max-[790px]:hidden'>
			<button
				type='button'
				className='absolute top-0 -right-5.5 z-10 text-primary max-[970px]:hidden'
				onClick={() => setIsActive(!isActive)}
			>
				{!isActive ? <PanelLeftClose /> : <PanelRightClose />}
			</button>
			<div className=''>
				<Logo state={isActive} className='max-[970px]:hidden' />
				<nav>
					<ul
						className={`flex flex-col gap-5 pt-9 max-[950px]:items-center ${isActive && 'items-center'}`}
					>
						{menuData.map((item, index) => (
							<li key={index}>
								<Link
									to={item.href}
									className='flex items-center gap-1.5 py-1 transition-all hover:scale-108'
								>
									<item.icon className='' />
									<span
										className={cn('max-[970px]:hidden', {
											hidden: isActive,
										})}
									>
										{item.name}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<div>
				<ProfileStatus
					className={`max-[970px]:hidden ${isActive && 'hidden'}`}
				/>
			</div>
		</aside>
	)
}
