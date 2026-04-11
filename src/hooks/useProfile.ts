import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { userService } from '../shared/services/userService'
import { useAuthStore } from '../store/auth.store'
import type {
	IErrorResponse,
	IFriendRequest,
	IInputSearchUser,
	IProfileResponse,
} from '../types/types'

export const useProfile = () => {
	const { setMessages, messages } = useAuthStore()
	const queryClient = useQueryClient()

	const {
		mutate: searchUser,
		data: user,
		isSuccess: userSuccess,
		isError: userError,
	} = useMutation<IProfileResponse, AxiosError, IInputSearchUser>({
		mutationKey: ['searchUser'],
		mutationFn: userService.searchUser,
	})

	const { register, handleSubmit } = useForm<IInputSearchUser>()
	const onSearch = (formData: IInputSearchUser) => {
		searchUser(formData)
	}

	const {
		mutate: addFriend,
		isSuccess: isAddFriend,
		isError: friendError,
	} = useMutation<IFriendRequest, AxiosError<IErrorResponse>, string>({
		mutationKey: ['friendRequest'],
		mutationFn: userService.friendRequest,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['friend-requests'] }),
		onError: error => {
			console.log(error.response?.data)
			setMessages(
				error.response?.data.message || [
					'Произошла ошибка. Попробуйте еще раз.',
				],
			)
		},
	})

	const { data: requests } = useQuery<IFriendRequest[], AxiosError>({
		queryKey: ['friend-requests'],
		queryFn: userService.getFriendRequests,
	})
	console.log(requests)

	const { mutate: acceptFriend } = useMutation<
		IFriendRequest,
		AxiosError,
		string
	>({
		mutationKey: ['friend-accept'],
		mutationFn: userService.acceptRequest,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['friend-requests', 'friends'],
			}),
	})

	const { mutate: rejectFriend } = useMutation({
		mutationKey: ['friend-reject'],
		mutationFn: userService.rejectRequest,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['friend-requests'] }),
	})

	const { data: getFriends } = useQuery<IProfileResponse[], AxiosError>({
		queryKey: ['friends'],
		queryFn: userService.getFriends,
	})
	return {
		messages,
		user,
		userError,
		userSuccess,
		register,
		handleSubmit,
		onSearch,
		addFriend,
		isAddFriend,
		friendError,
		acceptFriend,
		rejectFriend,
		getFriends,
		requests,
	}
}
