import { create } from 'zustand'

type Store = {
	messages: string[]
	accessToken?: string | null
	setMessages: (msg: string[]) => void
	setAccessToken: (token: string | null) => void
}

export const useAuthStore = create<Store>(set => ({
	messages: [],
	accessToken: null,
	setAccessToken: token => set({ accessToken: token }),
	setMessages: msg => set({ messages: msg || [] }),
}))
