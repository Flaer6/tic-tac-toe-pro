import axios from 'axios'
import { useEffect } from 'react'
import { client } from '../libs/apollo-client'
import { useAuthStore } from '../store/auth.store'

export const useAuthBootstrap = () => {
	const setAccessToken = useAuthStore(s => s.setAccessToken)
	const setStatus = useAuthStore(s => s.setStatus)
	const logout = useAuthStore(s => s.logout)

	useEffect(() => {
		const init = async () => {
			setStatus('loading')

			try {
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{},
					{ withCredentials: true },
				)

				setAccessToken(res.data.accessToken)

				await client.resetStore()
			} catch (e) {
				logout()
			}
		}

		init()
	}, [])
}
