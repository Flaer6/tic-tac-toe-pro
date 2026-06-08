// import { useQuery } from '@tanstack/react-query'
// import type { AxiosError } from 'axios'
// import { userService } from '../../shared/services/userService'
// import { useAuthStore } from '../../store/auth.store'
// import type { IProfileResponse } from '../../types/types'

// const useGetProfile1111 = () => {
// 	const isAuth = useAuthStore(state => state.isAuth)

// 	const { data: user, refetch: userRefetch } = useQuery<
// 		IProfileResponse,
// 		AxiosError
// 	>({
// 		queryKey: ['profile'],
// 		enabled: isAuth,
// 		queryFn: userService.getUser,
// 	})

// 	const createAtUser = user?.createdAt
// 		? new Date(user.createdAt).toLocaleDateString('ru-RU', {
// 				day: 'numeric',
// 				month: 'long',
// 				year: 'numeric',
// 			})
// 		: ''
// 	return {
// 		user,
// 		createAtUser,
// 		userRefetch,
// 	}
// }
