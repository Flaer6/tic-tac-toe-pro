import { Outlet } from 'react-router-dom'
import { useMe } from '../../../hooks/useMe'
import { AuthLayout } from '../auth/AuthLayout'

export const Layout = () => {
	const { data: user } = useMe()
	return (
		<div className=''>
			{!user ? (
				<AuthLayout />
			) : (
				<div>
					{user.username}, {user.publicId}
				</div>
			)}
			<main>
				<Outlet />
			</main>
		</div>
	)
}
