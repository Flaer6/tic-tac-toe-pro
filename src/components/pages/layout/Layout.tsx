import { Outlet } from 'react-router-dom'
import { AuthLayout } from '../auth/AuthLayout'

export const Layout = () => {
	return (
		<div className=''>
			<AuthLayout />
			<main>
				<Outlet />
			</main>
		</div>
	)
}
