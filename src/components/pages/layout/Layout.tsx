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
	const status = useAuthStore(s => s.status)

	// 💥 правильный gate
	const skip = status !== 'authenticated'

	const { data } = useGetMeQuery({
		skip,
	})

	useGameSocket()

	// ======================
	// LOADING STATE
	// ======================
	if (status === 'loading') {
		return (
			<div className='fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#070B14]/90 backdrop-blur-md'>
				{/* Ambient blobs */}
				<div className='pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-indigo-600/10 blur-[80px]' />
				<div className='pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-violet-600/8 blur-[80px]' />

				<Loader />

				<p className='text-xs font-semibold uppercase tracking-widest text-white/20'>
					Загрузка…
				</p>
			</div>
		)
	}

	return (
		<div
			className={cn(
				{ flex: !!data?.getMe },
				'bg-[url("/bg.png")] bg-cover bg-center h-full p-2.5',
			)}
		>
			{/* ======================
          AUTH VIEW
      ====================== */}
			{!data?.getMe && <AuthLayout />}

			{/* ======================
          AUTHED UI
      ====================== */}
			{data?.getMe && (
				<>
					<AsideMenu />
					<MobileMenu />
				</>
			)}

			<main className='mx-auto relative w-full overflow-y-auto h-dvh'>
				<Outlet />
			</main>
		</div>
	)
}
