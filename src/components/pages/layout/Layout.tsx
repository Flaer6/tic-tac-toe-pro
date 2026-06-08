import cn from 'clsx'
import { Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../../../graphql/generated/output'
import { useAuthBootstrap } from '../../../hooks/useCheckAuth'
import { useGameSocket } from '../../../hooks/useGameSocket'
import { Loader } from '../../ui/Loader'
import { AuthLayout } from '../auth/AuthLayout'
import { AsideMenu } from './AsideMenu'
import { MobileMenu } from './MobileMenu'

export const Layout = () => {
	const { data, loading } = useGetMeQuery({
		fetchPolicy: 'network-only',
	})
	useAuthBootstrap()

	useGameSocket()

	if (loading) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)
	}

	return (
		<div
			className={cn(
				{ flex: data?.getMe },
				'bg-[url("/bg.png")] bg-cover bg-center h-full p-2.5',
			)}
		>
			{!data?.getMe && <AuthLayout />}

			{data?.getMe && (
				<>
					<AsideMenu />
					<MobileMenu />
				</>
			)}

			<main className='mx-auto relative w-full overflow-y-auto h-dvh '>
				<Outlet />
			</main>
		</div>
	)
}
