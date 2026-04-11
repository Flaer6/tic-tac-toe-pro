import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export const PrivateRoute = () => {
	const { isAuth } = useAuthStore()

	return isAuth ? <Outlet /> : <Navigate to='/login' replace />
}

export const PublicRoute = () => {
	const { isAuth } = useAuthStore()

	return isAuth ? <Navigate to='/' replace /> : <Outlet />
}
