import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export const PrivateRoute = () => {
	const isAuth = !!useAuthStore(state => state.accessToken)

	return isAuth ? <Outlet /> : <Navigate to='/' replace />
}

export const PublicRoute = () => {
	const isAuth = !!useAuthStore(state => state.accessToken)

	return isAuth ? <Navigate to='/' replace /> : <Outlet />
}
