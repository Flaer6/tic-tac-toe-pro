import {
	Bot,
	CircleUser,
	Gamepad2,
	Globe,
	Home,
	Settings,
	ShieldUser,
	Users,
} from 'lucide-react'
import type { IMenu } from '../../../types/types'

export const getMenuData = (role?: string): IMenu[] => {
	const menuData: IMenu[] = [
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
			icon: Bot,
			name: 'Играть С Ботом',
			href: '/game-vs-ai',
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
		{
			icon: Settings,
			name: 'Настройки',
			href: '/settings',
		},
	]
	if (role === 'ADMIN') {
		menuData.push({
			icon: ShieldUser,
			name: 'Администрирование',
			href: '/admin',
		})
	}

	return menuData
}
