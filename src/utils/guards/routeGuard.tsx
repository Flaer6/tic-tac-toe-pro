import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../../graphql/generated/output'
import { useAuthStore } from '../../store/auth.store'

export const PrivateRoute = () => {
	const isAuth = !!useAuthStore(state => state.accessToken)

	return isAuth ? <Outlet /> : <Navigate to='/' replace />
}

export const PublicRoute = () => {
	const isAuth = !!useAuthStore(state => state.accessToken)

	return isAuth ? <Navigate to='/' replace /> : <Outlet />
}

export const AdminRoute = () => {
	const { data } = useGetMeQuery()

	const user = data?.getMe

	if (!user) {
		return <Navigate to='/' replace />
	}

	return user.role === 'ADMIN' ? <Outlet /> : <Navigate to='/' replace />
}
