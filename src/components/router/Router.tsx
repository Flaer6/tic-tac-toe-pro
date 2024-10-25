import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Game from '../pages/localGame/Game'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='/game' element={<Game />} />
			</Routes>
		</BrowserRouter>
	)
}
