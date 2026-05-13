import { useApolloClient } from '@apollo/client/react'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { GetMeDocument } from '../graphql/generated/output'
import { userService } from '../shared/services/userService'
import type { IUpdateProfileResponse } from '../types/types'

export const useProfileUpdate = () => {
	const apolloClient = useApolloClient()
	const { mutate: updateProfileMutate, isPending: isUpdating } = useMutation<
		unknown,
		AxiosError<{ message: string }>,
		IUpdateProfileResponse
	>({
		mutationKey: ['update-profile'],
		mutationFn: userService.updateProfile,
		onSuccess: async () => {
			await apolloClient.refetchQueries({
				include: [GetMeDocument],
			})
		},
		onError: (error: AxiosError<{ message: string[] | string }>) => {
			const message = error.response?.data?.message

			toast.error(Array.isArray(message) ? message[0] : message || 'Ошибка')
		},
	})
	return {
		updateProfileMutate,
		isUpdating,
	}
}
