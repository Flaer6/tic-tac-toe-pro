import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthBootstrap } from '../../hooks/useCheckAuth'
import { PrivateRoute, PublicRoute } from '../../utils/guards/routeGuard'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import Game from '../pages/game/localGame/Game'
import { OnlineGame } from '../pages/game/onlineGame/OnlineGame'
import Home from '../pages/home/Home'
import { Layout } from '../pages/layout/Layout'
import NotFound from '../pages/notFound/NotFound'
import { Profile } from '../pages/profile/Profile'
import { FriendRequests } from '../pages/profile/tabs/friendRequests/FriendRequests'
import { Friends } from '../pages/profile/tabs/friends/Friends'

import { ForgotPassword } from '../pages/auth/ForgotPassword'
import { ResetPassword } from '../pages/auth/ResetPassword'
import GameVsAI from '../pages/game/ai/GameVsAI'
import { GameHistory } from '../pages/profile/tabs/history/History'
import { Statistic } from '../pages/profile/tabs/statistic/Statistic'
import { UserProfile } from '../pages/profile/userProfile/UserProfile'
import { Settings } from '../pages/settings/Settings'
import { GameSettingsTab } from '../pages/settings/tabs/game-settings/GameSettingsTab'
import { InterfaceTab } from '../pages/settings/tabs/interface/InterfaceTab'
import { ProfileTab } from '../pages/settings/tabs/profile/ProfileTab'
import { SecurityTab } from '../pages/settings/tabs/security/SecurityTab'
import { VerifyEmail } from '../test'

export default function Router() {
	useAuthBootstrap()
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/verify-email' element={<VerifyEmail />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/game' element={<Game />} />
					<Route path='/game-vs-ai' element={<GameVsAI />} />
					<Route element={<PrivateRoute />}>
						<Route path='/profile' element={<Profile />}>
							<Route index element={<Statistic />} />
							<Route path='history' element={<GameHistory />} />
							<Route path='friends' element={<Friends />} />
							<Route path='friendRequests' element={<FriendRequests />} />
						</Route>
						<Route path='/online' element={<OnlineGame />} />
						<Route path='/settings' element={<Settings />}>
							<Route index element={<ProfileTab />} />
							<Route path='security' element={<SecurityTab />} />
							<Route path='game-settings' element={<GameSettingsTab />} />
							<Route path='interface' element={<InterfaceTab />} />
						</Route>
						<Route path='/:id' element={<UserProfile />}></Route>
					</Route>
				</Route>
				<Route element={<PublicRoute />}>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/forgotPassword' element={<ForgotPassword />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
