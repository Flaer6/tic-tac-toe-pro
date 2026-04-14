import { CircleUser, Gamepad2, Globe, Users } from 'lucide-react'
import type { IMenu } from '../../../types/types'

export const menuData: IMenu[] = [
	{
		icon: Gamepad2,
		name: 'Играть локально',
		href: '/game',
	},
	{
		icon: Globe,
		name: 'Играть онлайн',
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
