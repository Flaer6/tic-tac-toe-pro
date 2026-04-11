import { useForm } from 'react-hook-form'
import { useAuthQuery } from '../../../hooks/useAuthQuery'
import type { IInputAuth } from '../../../types/types'
import { SubmitButton } from '../../ui/buttons/Submit.btn'
import { AuthForm } from '../../ui/forms/AuthForm'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const Register = () => {
	const { registerMutate, isRegisterError, messages } = useAuthQuery()

	const { register, handleSubmit } = useForm<IInputAuth>()

	const onRegister = (data: IInputAuth) => {
		registerMutate(data)
	}

	return (
		<div>
			<AuthForm onSubmit={handleSubmit(onRegister)}>
				<div className='flex flex-col items-center gap-4  '>
					<h1 className='text-center text-3xl font-extrabold leading-none pb-4'>
						Введите адрес почты и пароль
					</h1>
					{isRegisterError && (
						<span className='text-red-500'>*{messages[0]}</span>
					)}
					<InputAuth type='email' placeholder='Почта' {...register('email')} />
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
				<SubmitButton>Зарегистрироваться</SubmitButton>
			</AuthForm>
		</div>
	)
}
