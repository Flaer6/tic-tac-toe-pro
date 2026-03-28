import { Outlet } from 'react-router-dom'
import { useCheckAuth } from '../../../hooks/useCheckAuth'
import { authService } from '../../../shared/services/authService'
import { useAuthStore } from '../../../store/auth.store'
import { AuthLayout } from '../auth/AuthLayout'

export const Layout = () => {
	const { isAuth } = useAuthStore()
	const { isLoading } = useCheckAuth()
	if (isLoading) return <div>Loading...</div>

	return (
		<div className=''>
			{!isAuth && <AuthLayout />}
			{isAuth && (
				<div>
					<button className='bg-blue-600' onClick={authService.logout}>
						Logout
					</button>
				</div>
			)}

			<main>
				<Outlet />
			</main>
		</div>
	)
}
