import type {
	IFriendRequest,
	IInputSearchUser,
	IProfileResponse,
} from '../../types/types'
import { api } from '../api/api'

class UserService {
	async getUser() {
		const { data } = await api.get<IProfileResponse>('/user/profile')
		return data
	}
	async searchUser(data: IInputSearchUser): Promise<IProfileResponse> {
		const response = await api.post('/user/searchUser', data)
		return response.data
	}
	async friendRequest(toId: string): Promise<IFriendRequest> {
		const response = await api.post('/user/friend-request', { toId })
		return response.data
	}
	async getFriendRequests() {
		const { data } = await api.get<IFriendRequest[]>(
			'/user/get-friend-requests',
		)
		return data
	}
	async acceptRequest(requestId: string): Promise<IFriendRequest> {
		const response = await api.post('/user/friend-request/accept', {
			requestId,
		})
		return response.data
	}
	async rejectRequest(requestId: string) {
		return await api.post('/user/friend-request/reject', { requestId })
	}
	async getFriends() {
		const { data } = await api.get<IProfileResponse[]>('/user/friends')
		return data
	}
	async removeFriend(friendId: string) {
		return await api.post('/user/friends/remove', { friendId })
	}
}
export const userService = new UserService()
