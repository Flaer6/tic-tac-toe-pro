import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { userService } from '../shared/services/userService'
import type { IUpdateProfileResponse } from '../types/types'

export const useProfileUpdate = () => {
	const queryClient = useQueryClient()

	const { mutate: updateProfileMutate, isPending: isUpdating } = useMutation<
		unknown,
		AxiosError<{ message: string }>,
		IUpdateProfileResponse
	>({
		mutationKey: ['update-profile'],
		mutationFn: userService.updateProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
	})
	return {
		updateProfileMutate,
		isUpdating,
	}
}
