export const gameModes = [
	{
		to: '/game',
		end: true,
		label: 'Лимит ходов',
		description: 'У каждого игрока максимум 3 фишки — старая исчезает',
	},
	{
		to: '/game/classic',
		end: false,
		label: 'Классика',
		description: 'Классические крестики-нолики без ограничений',
	},
]

export const aiModes = [
	{
		to: '/ai',
		end: true,
		label: 'Лимит ходов',
		description: 'У каждого игрока максимум 3 фишки — старая исчезает',
	},
	{
		to: '/ai/classic',
		end: false,
		label: 'Классика',
		description: 'Классические крестики-нолики без ограничений',
	},
]
