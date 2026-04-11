import cn from 'clsx'
import { Outlet } from 'react-router-dom'
import { useCheckAuth } from '../../../hooks/useCheckAuth'
import { useAuthStore } from '../../../store/auth.store'
import { AuthLayout } from '../auth/AuthLayout'
import { AsideMenu } from './AsideMenu'
import { MobileMenu } from './MobileMenu'

export const Layout = () => {
	const { isAuth } = useAuthStore()
	const { isLoading } = useCheckAuth()
	if (isLoading) return <div>Loading...</div>

	return (
		<div className={cn({ flex: isAuth })}>
			{!isAuth && <AuthLayout />}
			{isAuth && (
				<>
					<AsideMenu />
					<MobileMenu />
				</>
			)}

			<main className=' mx-auto '>
				<Outlet />
			</main>
		</div>
	)
}
