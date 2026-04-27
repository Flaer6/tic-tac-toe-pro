import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../shared/api/api'

export const ResetPassword = () => {
	const [params] = useSearchParams()
	const navigate = useNavigate()

	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	const token = params.get('token')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!token) {
			setMessage('Нет токена')
			return
		}

		try {
			setLoading(true)

			await api.post('/auth/reset-password', {
				token,
				password,
			})

			setMessage('Пароль успешно изменён ✅')

			setTimeout(() => {
				navigate('/login')
			}, 2000)
		} catch (e) {
			setMessage('Ошибка или токен истёк ❌')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-6 max-w-md mx-auto'>
			<h2 className='text-xl mb-4'>Сброс пароля</h2>

			<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
				<input
					type='password'
					placeholder='Новый пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='p-2 border rounded'
				/>

				<button
					type='submit'
					disabled={loading}
					className='p-2 bg-blue-500 text-white rounded'
				>
					{loading ? 'Сброс...' : 'Сменить пароль'}
				</button>
			</form>

			{message && <p className='mt-4'>{message}</p>}
		</div>
	)
}
