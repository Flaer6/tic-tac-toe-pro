import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { api } from '../shared/api/api'
import { useAuthStore } from '../store/auth.store'
import type { IAuthResponse, IErrorResponse, IInputAuth } from '../types/types'

export const useAuthQuery = () => {
	const navigate = useNavigate()
	const { setAccessToken, setMessages, messages } = useAuthStore()

	const { mutate: registerMutate, isError: isRegisterError } = useMutation<
		IAuthResponse,
		AxiosError<IErrorResponse>,
		IInputAuth
	>({
		mutationKey: ['register'],
		mutationFn: async data => {
			setMessages([])
			const response = await api.post('/auth/register', data)
			return response.data
		},
		onSuccess: data => {
			setAccessToken(data.accessToken)
			console.log({ success: true })
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
		mutationFn: async data => {
			setMessages([])
			const response = await api.post('/auth/login', data)
			return response.data
		},
		onSuccess: data => {
			setAccessToken(data.accessToken)
			console.log({ success: true })
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

	return {
		registerMutate,
		isRegisterError,
		messages,
		loginMutate,
		isLoginError,
	}
}
