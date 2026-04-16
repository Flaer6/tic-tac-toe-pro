import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuthQuery } from '../../../hooks/useAuthQuery'
import type { IInputAuth } from '../../../types/types'
import { SubmitButton } from '../../ui/buttons/Submit.btn'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const Register = () => {
	const { registerMutate, isRegisterError, messages } = useAuthQuery()
	const { register, handleSubmit } = useForm<IInputAuth>()

	const onRegister = (data: IInputAuth) => {
		registerMutate(data)
	}

	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<div className='w-full max-w-md'>
				{/* CARD */}
				<div className='rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]'>
					{/* HEADER */}
					<div className='mb-6 text-center'>
						<h1 className='text-2xl sm:text-3xl font-semibold text-white'>
							Регистрация
						</h1>
						<p className='text-white/50 text-sm mt-1'>Создай новый аккаунт</p>
					</div>

					{/* FORM */}
					<form
						onSubmit={handleSubmit(onRegister)}
						className='flex flex-col gap-4'
					>
						{/* ERROR */}
						{isRegisterError && (
							<div className='rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 text-center'>
								{Array.isArray(messages) ? messages[0] : messages}
							</div>
						)}

						<InputAuth
							type='email'
							placeholder='Почта'
							autoComplete='email'
							className='w-full'
							{...register('email')}
						/>

						<InputAuth
							type='text'
							placeholder='Имя пользователя'
							className='w-full'
							{...register('username')}
						/>

						<InputAuth
							type='password'
							placeholder='Пароль'
							autoComplete='new-password'
							className='w-full'
							{...register('password')}
						/>

						<SubmitButton className='py-3 mt-2'>
							Зарегистрироваться
						</SubmitButton>
					</form>

					{/* FOOTER */}
					<div className='mt-6 text-center text-sm text-white/50'>
						Уже есть аккаунт?
						<Link
							to='/login'
							className='text-white hover:underline cursor-pointer'
						>
							Войти
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
