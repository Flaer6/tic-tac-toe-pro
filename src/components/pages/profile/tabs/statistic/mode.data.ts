import type { StatsMode } from '../../../../../graphql/generated/output'

export interface IStatModes {
	value: StatsMode
	label: string
}

export const statModes: IStatModes[] = [
	{ value: 'ALL', label: 'Общий' },
	{ value: 'CLASSIC', label: 'Классика' },
	{ value: 'LIMIT', label: 'Лимит ходов' },
]
