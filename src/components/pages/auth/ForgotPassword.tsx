import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { authService } from '../../../shared/services/authService'
import { SubmitButton } from '../../ui/buttons/Submit.btn'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const ForgotPassword = () => {
	const { register, handleSubmit } = useForm<{ email: string }>()

	const onSubmit = async (data: { email: string }) => {
		try {
			await authService.forgotPassword(data.email)

			toast.success('Ссылка для восстановления отправлена на почту')
		} catch (error) {
			const err = error as AxiosError<{ message: string }>
			toast.error(
				err?.response?.data?.message ||
					'Ошибка при отправке ссылки восстановления',
			)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center px-4'>
			<div className='w-full max-w-md'>
				<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8'>
					{/* HEADER */}
					<div className='mb-6 text-center'>
						<h1 className='text-2xl font-semibold text-white sm:text-3xl'>
							Восстановление пароля
						</h1>

						<p className='mt-2 text-sm text-white/50'>
							Введите почту вашего аккаунта и мы отправим инструкции для
							восстановления пароля.
						</p>
					</div>

					{/* FORM */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<InputAuth
							type='email'
							autoComplete='email'
							placeholder='Введите почту'
							className='w-full'
							{...register('email')}
						/>

						<SubmitButton className='mt-2 py-3'>Отправить ссылку</SubmitButton>
					</form>

					{/* FOOTER */}
					<div className='mt-6 text-center text-sm text-white/50'>
						Вспомнили пароль?{' '}
						<Link
							to='/login'
							className='cursor-pointer text-white transition hover:underline'
						>
							Войти
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
