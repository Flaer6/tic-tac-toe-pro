import cn from 'clsx'
import { Outlet } from 'react-router-dom'
import { useCheckAuth } from '../../../hooks/useCheckAuth'
import { useAuthStore } from '../../../store/auth.store'
import { Loader } from '../../ui/Loader'
import { AuthLayout } from '../auth/AuthLayout'
import { AsideMenu } from './AsideMenu'
import { MobileMenu } from './MobileMenu'

export const Layout = () => {
	const { isAuth } = useAuthStore()
	const { isLoading } = useCheckAuth()

	return (
		<div className={cn({ flex: isAuth })}>
			{!isAuth && <AuthLayout />}

			{isAuth && (
				<>
					<AsideMenu />
					<MobileMenu />
				</>
			)}

			<main className='mx-auto relative w-full overflow-y-auto h-dvh'>
				<Outlet />
			</main>

			{isLoading && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
					<Loader />
				</div>
			)}
		</div>
	)
}
