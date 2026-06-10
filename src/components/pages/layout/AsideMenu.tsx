import cn from 'clsx'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetMeQuery } from '../../../graphql/generated/output'
import { ProfileStatus } from '../../ui/forms/ProfileStatus'
import { Logo } from '../../ui/Logo'
import { getMenuData } from './menu.data'

export const AsideMenu = () => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const { data } = useGetMeQuery()

	const menu = useMemo(
		() => getMenuData(data?.getMe?.role),
		[data?.getMe?.role],
	)
	return (
		<aside
			className={`relative h-full p-3 max-w-60 w-full flex flex-col justify-between max-[970px]:items-center max-[790px]:hidden max-[970px]:w-fit ${isActive && 'w-fit!'} bg-card`}
		>
			<button
				type='button'
				className='absolute top-5 right-2 z-10 text-primary max-[970px]:hidden'
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
						{menu.map((item, index) => (
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
