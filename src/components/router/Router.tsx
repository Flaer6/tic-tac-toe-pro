import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { PublicRoute } from '../../utils/guards/routeGuard'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import Home from '../pages/home/Home'
import { Layout } from '../pages/layout/Layout'
import Game from '../pages/localGame/Game'

export default function Router() {
	const checkAuth = useCheckAuth()
	useEffect(() => {
		if (localStorage.getItem('accessToken')) checkAuth
	}, [])
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/game' element={<Game />} />
				</Route>

				<Route element={<PublicRoute />}>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
