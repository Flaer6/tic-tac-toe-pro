import { BarChart3, Clock3, Sparkles, UserPlus, Users } from 'lucide-react'
import type { ITab } from '../../../types/types'

export const tabsProfile: ITab[] = [
	{
		icon: BarChart3,
		name: 'Статистика',
		href: '',
	},
	{
		icon: Clock3,
		name: 'История',
		href: 'history',
	},
	{
		icon: Users,
		name: 'Друзья',
		href: 'friends',
	},
	{
		icon: UserPlus,
		name: 'Заявки в друзья',
		href: 'friendRequests',
	},
	{
		icon: Sparkles,
		name: 'Скины',
		href: 'skins',
	},
]
