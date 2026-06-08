import { create } from 'zustand'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

type Role = 'REGULAR' | 'ADMIN' | null

type Store = {
	// --- auth ---
	accessToken: string | null
	userId: string | null
	role: Role
	status: AuthStatus

	// --- optional app state ---
	messages: string[]

	// --- actions ---
	setAccessToken: (token: string | null) => void
	setUserId: (id: string | null) => void
	setRole: (role: Role) => void

	setStatus: (status: AuthStatus) => void

	setMessages: (msg: string[] | null) => void

	logout: () => void
}

export const useAuthStore = create<Store>(set => ({
	// ======================
	// STATE
	// ======================
	accessToken: null,
	userId: null,
	role: null,
	status: 'loading',

	messages: [],

	// ======================
	// SETTERS
	// ======================
	setAccessToken: token =>
		set({
			accessToken: token,
			status: token ? 'authenticated' : 'unauthenticated',
		}),

	setUserId: id => set({ userId: id }),

	setRole: role => set({ role }),

	setStatus: status => set({ status }),

	setMessages: msg => set({ messages: msg ?? [] }),

	// ======================
	// LOGOUT
	// ======================
	logout: () =>
		set({
			accessToken: null,
			userId: null,
			role: null,
			messages: [],
			status: 'unauthenticated',
		}),
}))
