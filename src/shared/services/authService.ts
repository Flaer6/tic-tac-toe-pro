import { useAuthStore } from '../../store/auth.store'
import type { IAuthResponse, IInputAuth } from '../../types/types'
import { api } from '../api/api'

class AuthService {
	async register(data: IInputAuth): Promise<IAuthResponse> {
		const response = await api.post('/auth/register', data)
		return response.data
	}
	async login(data: IInputAuth): Promise<IAuthResponse> {
		const response = await api.post('/auth/login', data)
		return response.data
	}
	async logout(): Promise<void> {
		await api.post('/auth/logout')
		localStorage.removeItem('accessToken')
		useAuthStore.setState({ isAuth: false })
	}
}

export const authService = new AuthService()
