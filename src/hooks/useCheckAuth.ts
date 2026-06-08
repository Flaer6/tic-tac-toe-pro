import axios from 'axios'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store'

export const useAuthBootstrap = () => {
	const setAccessToken = useAuthStore(s => s.setAccessToken)

	useEffect(() => {
		const init = async () => {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/refresh`,
				{},
				{ withCredentials: true },
			)

			setAccessToken(res.data.accessToken)
		}

		init()
	}, [])
}
