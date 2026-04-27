import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../shared/api/api'

export const VerifyEmail = () => {
	const [params] = useSearchParams()

	useEffect(() => {
		const token = params.get('token')

		if (token) {
			api.get(`/auth/verify-email?token=${token}`)
		}
	}, [])

	return <div>Подтверждение...</div>
}
