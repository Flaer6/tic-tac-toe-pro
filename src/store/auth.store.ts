import { create } from 'zustand'

type Store = {
	messages: string[] | null
	isAuth: boolean
	accessToken: string | null
	setMessages: (msg: string[] | null) => void
	setAuth: (isAuth: boolean) => void
	setAccessToken: (token: string | null) => void
	logout: () => void
}

export const useAuthStore = create<Store>(set => ({
	messages: null,
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
