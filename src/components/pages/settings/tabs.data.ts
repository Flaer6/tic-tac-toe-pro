import { Shield, User } from 'lucide-react'

import type { ITab } from '../../../types/types'

export const settingsTabs: ITab[] = [
	{
		icon: User,
		name: 'Профиль',
		href: '',
	},
	{
		icon: Shield,
		name: 'Учетная запись',
		href: 'security',
	},
	// {
	// 	icon: Gamepad2,
	// 	name: 'Игровые настройки',
	// 	href: 'game-settings',
	// },
	// {
	// 	icon: LayoutDashboard,
	// 	name: 'Интерфейс',
	// 	href: 'interface',
	// },
]
