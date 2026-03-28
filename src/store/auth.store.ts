import { create } from 'zustand'

type Store = {
	messages: string[]
	isAuth: boolean
	setMessages: (msg: string[]) => void
	setAuth: (isAuth: boolean) => void
}

export const useAuthStore = create<Store>(set => ({
	messages: [],
	isAuth: false,

	setMessages: msg => set({ messages: msg || [] }),
	setAuth: isAuth => set({ isAuth }),
}))
