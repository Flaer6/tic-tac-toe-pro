import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { authService } from '../../../shared/services/authService'

import { SubmitButton } from '../../ui/buttons/Submit.btn'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const ResetPassword = () => {
	const [params] = useSearchParams()
	const navigate = useNavigate()

	const token = params.get('token')

	const {
		register,
		handleSubmit,
		formState: { isDirty, isSubmitting },
	} = useForm<{ password: string }>()

	const onSubmit = async (data: { password: string }) => {
		try {
			await authService.resetPassword(token!, data.password)

			toast.success('Пароль успешно изменён')

			setTimeout(() => {
				navigate('/login')
			}, 2000)
		} catch (error) {
			const err = error as AxiosError<{ message: string }>

			toast.error(err.response?.data?.message || 'Ошибка или токен истёк')
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center px-4'>
			<div className='w-full max-w-md'>
				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8'>
					<div className='mb-6 text-center'>
						<h1 className='text-2xl font-semibold text-white sm:text-3xl'>
							Сброс пароля
						</h1>

						<p className='mt-2 text-sm text-white/50'>
							Введите новый пароль для вашего аккаунта
						</p>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<InputAuth
							type='password'
							placeholder='Новый пароль'
							{...register('password')}
						/>

						<SubmitButton
							disabled={!isDirty || isSubmitting}
							className='mt-2 py-3 disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isSubmitting ? 'Сохранение...' : 'Сохранить пароль'}
						</SubmitButton>
					</form>
				</div>
			</div>
		</div>
	)
}
