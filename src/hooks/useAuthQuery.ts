import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { authService } from '../shared/services/authService'
import { useAuthStore } from '../store/auth.store'
import type { IAuthResponse, IErrorResponse, IInputAuth } from '../types/types'

export const useAuthQuery = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { setMessages, messages, setAccessToken } = useAuthStore()
	const { setAuth } = useAuthStore()
	const { mutate: registerMutate, isError: isRegisterError } = useMutation<
		IAuthResponse,
		AxiosError<IErrorResponse>,
		IInputAuth
	>({
		mutationKey: ['register'],
		mutationFn: authService.register,
		onSuccess: data => {
			setAccessToken(data.accessToken)
			queryClient.invalidateQueries({ queryKey: ['profile'] })

			navigate('/')
		},
		onError: error => {
			console.log(error.response?.data)
			setMessages(
				error.response?.data.message || [
					'Произошла ошибка при регистрации. Попробуйте еще раз.',
				],
			)
		},
	})

	const { mutate: loginMutate, isError: isLoginError } = useMutation<
		IAuthResponse,
		AxiosError<IErrorResponse>,
		IInputAuth
	>({
		mutationKey: ['login'],
		mutationFn: authService.login,
		onSuccess: async data => {
			setAccessToken(data.accessToken)
			setAuth(true)
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			navigate('/')
		},
		onError: error => {
			console.log(error)
			setMessages(
				error.response?.data.message || [
					'Произошла ошибка при регистрации. Попробуйте еще раз.',
				],
			)
		},
	})

	const handleLogout = async () => {
		await authService.logout()
		queryClient.clear()
		navigate('/')
	}

	return {
		registerMutate,
		isRegisterError,
		messages,
		loginMutate,
		isLoginError,
		handleLogout,
	}
}
