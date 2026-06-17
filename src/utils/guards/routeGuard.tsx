import { Navigate, Outlet } from 'react-router-dom'
import { Loader } from '../../components/ui/Loader'
import { useGetMeQuery } from '../../graphql/generated/output'

export const PrivateRoute = () => {
	const { data, loading } = useGetMeQuery()
	const isAuth = !!data?.getMe

	if (loading) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)
	}
	return isAuth ? <Outlet /> : <Navigate to='/login' replace />
}

export const PublicRoute = () => {
	const { data, loading } = useGetMeQuery()
	const isAuth = !!data?.getMe
	if (loading) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)
	}
	return isAuth ? <Navigate to='/' replace /> : <Outlet />
}

export const AdminRoute = () => {
	const { data, loading } = useGetMeQuery()

	const isAuth = !!data?.getMe
	if (loading) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)
	}
	if (!isAuth) {
		return <Navigate to='/' replace />
	}

	return data.getMe.role === 'ADMIN' ? <Outlet /> : <Navigate to='/' replace />
}
