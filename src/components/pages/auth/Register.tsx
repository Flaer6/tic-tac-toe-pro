import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { api } from '../../../shared/api/api'
import type { IAuthResponse, IInputAuth } from '../../../types/types'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const Register = () => {
	const { mutate } = useMutation<IAuthResponse, AxiosError, IInputAuth>({
		mutationKey: ['register'],
		mutationFn: async data => {
			const response = await api.post('/auth/register', data)
			return response.data
		},
		onSuccess: data => console.log('Registration successful:', data),
		onError: error => {
			console.log(error.response?.data)
		},
	})
	const { register, handleSubmit } = useForm<IInputAuth>()

	const onRegister = (data: IInputAuth) => {
		mutate(data)
	}

	return (
		<div onSubmit={handleSubmit(onRegister)}>
			<form action=''>
				<div className='max-w-md mx-auto w-full p-6 rounded-lg flex flex-col items-center gap-6'>
					<div className='flex flex-col items-center gap-4  '>
						<h1 className='text-center text-3xl font-extrabold leading-none pb-4'>
							Введите адрес почты и пароль
						</h1>
						<InputAuth
							type='email'
							placeholder='Почта'
							{...register('email')}
						/>
						<InputAuth
							type='password'
							placeholder='Пароль'
							autoComplete='off'
							{...register('password')}
						/>
						<InputAuth
							type='text'
							placeholder='Имя пользователя'
							{...register('username')}
						/>
					</div>
					<button
						className='bg-btn-blue py-3 px-7 font-semibold text-lg rounded-xl'
						type='button'
						onClick={handleSubmit(onRegister)}
					>
						Зарегистрироваться
					</button>
				</div>
			</form>
		</div>
	)
}
