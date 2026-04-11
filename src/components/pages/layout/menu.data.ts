import {
	CircleUser,
	Gamepad2,
	Globe,
	Users,
	type LucideIcon,
} from 'lucide-react'

interface IMenu {
	icon: LucideIcon
	name: string
	href: string
}

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
		href: '#',
	},
	{
		icon: CircleUser,
		name: 'Профиль',
		href: '/profile',
	},
]
