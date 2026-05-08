import { BarChart3, Flame, Target, Trophy } from 'lucide-react'

export const getStatsItems = (stats?: {
	totalGames: number
	wins: number
	losses: number
	winStreak: number
	winRate: number
}) => [
	{
		label: 'Победы',
		value: stats?.wins ?? 0,
		icon: Trophy,
		color: 'text-emerald-400',
		bg: 'bg-emerald-500/5 border-emerald-500/20',
	},
	{
		label: 'Поражения',
		value: stats?.losses ?? 0,
		icon: Target,
		color: 'text-red-400',
		bg: 'bg-red-500/5 border-red-500/20',
	},
	{
		label: 'Серия',
		value: stats?.winStreak ?? 0,
		icon: Flame,
		color: 'text-orange-400',
		bg: 'bg-orange-500/5 border-orange-500/20',
	},
	{
		label: 'Всего игр',
		value: stats?.totalGames ?? 0,
		icon: BarChart3,
		color: 'text-blue-400',
		bg: 'bg-blue-500/5 border-blue-500/20',
	},
	{
		label: 'Процент побед',
		value: stats?.winRate ?? 0,
		icon: BarChart3,
		color: 'text-blue-400',
		bg: 'bg-blue-500/5 border-blue-500/20',
	},
]
