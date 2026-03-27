import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useMe } from '../../hooks/useMe'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { isLoading, isError, data } = useMe()

	if (isLoading) return <div>Loading...</div>

	if (isError || !data) return <Navigate to='/login' />

	return children
}

export const PublicRoute = ({ children }: { children: ReactNode }) => {
	const { data, isLoading } = useMe()

	if (isLoading) return null

	if (data) return <Navigate to='/' />

	return <>{children}</>
}
