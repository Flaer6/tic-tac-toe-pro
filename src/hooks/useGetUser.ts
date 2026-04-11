import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { userService } from '../shared/services/userService'
import { useAuthStore } from '../store/auth.store'
import type { IProfileResponse } from '../types/types'

export const useGetProfile = () => {
	const isAuth = useAuthStore(state => state.isAuth)
	return useQuery<IProfileResponse, AxiosError>({
		queryKey: ['profile'],
		enabled: isAuth,
		queryFn: userService.getUser,
	})
}
