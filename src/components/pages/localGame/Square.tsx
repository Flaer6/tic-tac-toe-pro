import cn from 'clsx'
import type { SquareProps } from '../../../types/types'
import styles from './localGame.module.scss'

export default function Square({ value, onSquareClick }: SquareProps) {
	return (
		<button
			className={cn(
				styles.square,
				value == 'X' ? 'text-neutral-900' : 'text-rose-800'
			)}
			onClick={onSquareClick}
		>
			{value}
		</button>
	)
}
