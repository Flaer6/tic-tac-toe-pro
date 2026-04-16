import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { PrivateRoute, PublicRoute } from '../../utils/guards/routeGuard'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import Home from '../pages/home/Home'
import { Layout } from '../pages/layout/Layout'
import Game from '../pages/localGame/Game'
import NotFound from '../pages/notFound/NotFound'
import { OnlineGame } from '../pages/onlineGame/OnlineGame'
import { Profile } from '../pages/profile/Profile'
import { FriendRequests } from '../pages/profile/tabs/FriendRequests'
import { Friends } from '../pages/profile/tabs/Friends'
import { History } from '../pages/profile/tabs/History'
import { Statistic } from '../pages/profile/tabs/Statistic'

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
					<Route element={<PrivateRoute />}>
						<Route path='/profile' element={<Profile />}>
							<Route index element={<Statistic />} />
							<Route path='history' element={<History />} />
							<Route path='friends' element={<Friends />} />
							<Route path='friendRequests' element={<FriendRequests />} />
						</Route>
						<Route path='/online' element={<OnlineGame />} />
					</Route>
				</Route>
				<Route element={<PublicRoute />}>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
