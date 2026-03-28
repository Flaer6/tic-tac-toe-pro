import type { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useCheckAuth } from '../../hooks/useCheckAuth'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { isLoading, isError, data } = useCheckAuth()

	if (isLoading) return <div>Loading...</div>

	if (isError || !data) return <Navigate to='/login' />

	return children
}

export const PublicRoute = () => {
	const { data, isLoading } = useCheckAuth()

	if (isLoading) return <Outlet />

	if (data) return <Navigate to='/' />

	return <Outlet />
}
