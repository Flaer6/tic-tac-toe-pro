import { create } from 'zustand'

type Store = {
	messages: string[] | null

	accessToken: string | null
	userId: string | null

	isAuthLoading: boolean
	setMessages: (msg: string[] | null) => void

	setAuthLoading: (v: boolean) => void
	setAccessToken: (token: string | null) => void
	setUserId: (id: string | null) => void
	logout: () => void
}

export const useAuthStore = create<Store>(set => ({
	messages: null,
	accessToken: null,
	userId: null,
	isAuthLoading: true,

	setAuthLoading: v => set({ isAuthLoading: v }),
	setAccessToken: token => {
		set({ accessToken: token })
	},

	setUserId: id => set({ userId: id }),

	setMessages: msg => set({ messages: msg || [] }),

	logout: () => {
		set({
			accessToken: null,
			userId: null,
			messages: [],
		})
	},
}))
