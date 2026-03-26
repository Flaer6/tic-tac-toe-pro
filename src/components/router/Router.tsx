import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import Home from '../pages/home/Home'
import { Layout } from '../pages/layout/Layout'
import Game from '../pages/localGame/Game'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/game' element={<Game />} />
				</Route>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</BrowserRouter>
	)
}
