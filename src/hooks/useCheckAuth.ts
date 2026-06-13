import { useEffect } from 'react'
import { client } from '../libs/apollo-client'
import { getValidToken } from '../shared/api/refresh'
import { useAuthStore } from '../store/auth.store'

export const useAuthBootstrap = () => {
	useEffect(() => {
		const init = async () => {
			useAuthStore.getState().setStatus('loading')

			try {
				await getValidToken()
				useAuthStore.getState().setStatus('authenticated')
			} catch (e) {
				useAuthStore.getState().logout()
				await client
					.clearStore()
					.catch(err => console.error('Ошибка очистки кэша:', err))
			}
		}

		init()
	}, [])
}
