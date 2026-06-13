import { client } from '../../libs/apollo-client'
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

	async forgotPassword(email: string): Promise<void> {
		return await api.post('/auth/forgot-password', { email })
	}

	async resetPassword(token: string, password: string): Promise<void> {
		return await api.post('/auth/reset-password', {
			token,
			password,
		})
	}

	async logout(): Promise<void> {
		await api.post('/auth/logout')
		useAuthStore.getState().logout()
		await client.clearStore()
	}
}

export const authService = new AuthService()
