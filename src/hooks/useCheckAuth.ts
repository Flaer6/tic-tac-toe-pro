import axios from 'axios'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store'

export const useAuthBootstrap = () => {
	const setAccessToken = useAuthStore(s => s.setAccessToken)
	const setAuthLoading = useAuthStore(s => s.setAuthLoading)
	const logout = useAuthStore(s => s.logout)

	useEffect(() => {
		const init = async () => {
			try {
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{},
					{ withCredentials: true },
				)

				setAccessToken(res.data.accessToken)
			} catch {
				logout()
			} finally {
				setAuthLoading(false)
			}
		}

		init()
	}, [])
}
