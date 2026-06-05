import cn from 'clsx'
import { Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../../../graphql/generated/output'
import { useGameSocket } from '../../../hooks/useGameSocket'
import { useAuthStore } from '../../../store/auth.store'
import { Loader } from '../../ui/Loader'
import { AuthLayout } from '../auth/AuthLayout'
import { AsideMenu } from './AsideMenu'
import { MobileMenu } from './MobileMenu'

export const Layout = () => {
	const isAuth = !!useAuthStore(state => state.accessToken)
	const isAuthLoading = useAuthStore(s => s.isAuthLoading)
	const { data, loading } = useGetMeQuery()

	useGameSocket()
	const user = data?.getMe
	if (loading) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)
	}

	if (isAuthLoading)
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)

	return (
		<div
			className={cn(
				{ flex: user },
				'bg-[url("/bg.png")] bg-cover bg-center h-full p-2.5',
			)}
		>
			{!user && <AuthLayout />}

			{isAuth && (
				<>
					<AsideMenu />
					<MobileMenu />
				</>
			)}

			<main className='mx-auto relative w-full overflow-y-auto h-dvh '>
				<Outlet />
			</main>

			{/* {isLoading && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
					<Loader />
				</div>
			)} */}
		</div>
	)
}
