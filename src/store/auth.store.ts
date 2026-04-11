import { create } from 'zustand'

type Store = {
	messages: string[]
	isAuth: boolean
	accessToken: string | null
	setMessages: (msg: string[]) => void
	setAuth: (isAuth: boolean) => void
	setAccessToken: (token: string | null) => void
	logout: () => void
}

export const useAuthStore = create<Store>(set => ({
	messages: [],
	accessToken: localStorage.getItem('accessToken'),
	isAuth: !!localStorage.getItem('accessToken'),

	setAccessToken: token => {
		set({
			accessToken: token,
			isAuth: !!token,
		})
	},
	setMessages: msg => set({ messages: msg || [] }),
	setAuth: isAuth => set({ isAuth }),
	logout: () => {
		set({ isAuth: false, messages: [], accessToken: null })
	},
}))
