import { useForm } from 'react-hook-form'
import { useAuthQuery } from '../../../hooks/AuthQuery'
import type { IInputAuth } from '../../../types/types'
import { SubmitButton } from '../../ui/buttons/Submit.btn'
import { AuthForm } from '../../ui/forms/AuthForm'
import { InputAuth } from '../../ui/inputs/InputAuth'

export const Login = () => {
	const { loginMutate, isLoginError, messages } = useAuthQuery()

	const { register, handleSubmit } = useForm<IInputAuth>()

	const onLogin = (data: IInputAuth) => {
		loginMutate(data)
	}
	return (
		<div className=''>
			<AuthForm onSubmit={handleSubmit(onLogin)}>
				{isLoginError && <span className='text-red-500'>*{messages}</span>}
				<InputAuth
					type='email'
					autoComplete='email'
					placeholder='Почта или имя пользователя'
					{...register('identifier')}
				/>
				<InputAuth
					type='password'
					autoComplete='current-password'
					placeholder='Пароль'
					{...register('password')}
				/>
				<SubmitButton onClick={handleSubmit(onLogin)}>Войти</SubmitButton>
			</AuthForm>
		</div>
	)
}
