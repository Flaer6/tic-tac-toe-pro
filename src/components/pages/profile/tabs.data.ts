interface ITab {
	name: string
	href: string
}

export const tabsProfile: ITab[] = [
	{
		name: 'Статистика',
		href: '',
	},
	{
		name: 'История',
		href: 'history',
	},
	{
		name: 'Друзья',
		href: 'friends',
	},
	{
		name: 'Заявки в друзья',
		href: 'friendRequests',
	},
]
