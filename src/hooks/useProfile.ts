import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { userService } from '../shared/services/userService'
import { useAuthStore } from '../store/auth.store'
import {
	FriendStatus,
	type IErrorResponse,
	type IFriendRequest,
	type IInputSearchUser,
	type IProfileResponse,
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
		onSuccess: () => {
			setMessages(null)
		},
	})

	const onSearch = (formData: IInputSearchUser) => {
		resetFriendState()
		searchUser(formData)
	}

	const {
		mutate: addFriend,
		isSuccess: isAddFriend,
		isError: friendError,
		reset: resetFriendState,
	} = useMutation<IFriendRequest, AxiosError<IErrorResponse>, string>({
		mutationKey: ['friendRequest'],
		mutationFn: userService.friendRequest,
		onSuccess: () => {
			setMessages(null)
			queryClient.invalidateQueries({ queryKey: ['friend-requests'] })
			queryClient.invalidateQueries({ queryKey: ['friends'] })
		},
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

	const { mutate: acceptFriend, isPending: isAccepting } = useMutation<
		IFriendRequest,
		AxiosError,
		string
	>({
		mutationKey: ['friend-accept'],
		mutationFn: userService.acceptRequest,
		onSuccess: () => {
			toast.success('Друг добавлен 🎉')
			queryClient.invalidateQueries({ queryKey: ['friend-requests'] })
			queryClient.invalidateQueries({ queryKey: ['friends'] })
		},
	})

	const { mutate: rejectFriend, isPending: isRejecting } = useMutation({
		mutationKey: ['friend-reject'],
		mutationFn: userService.rejectRequest,
		onSuccess: () => {
			toast('Заявка отклонена', { icon: '❌' })
			queryClient.invalidateQueries({ queryKey: ['friend-requests'] })
			queryClient.invalidateQueries({ queryKey: ['friends'] })
		},
	})

	const { data: getFriends } = useQuery<IProfileResponse[], AxiosError>({
		queryKey: ['friends'],
		queryFn: userService.getFriends,
	})

	const { mutate: friendRemove } = useMutation({
		mutationKey: ['friend-remove'],
		mutationFn: userService.removeFriend,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['friends'] }),
	})
	const pendingRequests =
		requests?.filter(r => r.status === FriendStatus.PENDING) ?? []
	return {
		messages,
		user,
		userError,
		userSuccess,
		friendRemove,
		onSearch,
		addFriend,
		isAddFriend,
		friendError,
		acceptFriend,
		rejectFriend,
		getFriends,
		requests,
		resetFriendState,
		isAccepting,
		isRejecting,
		pendingRequests,
	}
}
