import { CircleUser, Gamepad2, Globe, Home, Users } from 'lucide-react'
import type { IMenu } from '../../../types/types'

export const menuData: IMenu[] = [
	{
		icon: Home,
		name: 'На Главную',
		href: '/',
	},
	{
		icon: Gamepad2,
		name: 'Играть Локально',
		href: '/game',
	},
	{
		icon: Globe,
		name: 'Играть Онлайн',
		href: '/online',
	},
	{
		icon: Users,
		name: 'Друзья',
		href: '/profile/friends',
	},
	{
		icon: CircleUser,
		name: 'Профиль',
		href: '/profile',
	},
]
