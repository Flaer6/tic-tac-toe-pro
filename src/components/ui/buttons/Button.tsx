import cn from 'clsx'
import { Link } from 'react-router-dom'
import type { IProps } from '../../../types/types'
import styles from './Button.module.css'

export default function Button({ children, to, soon, ...rest }: IProps) {
	return (
		<Link
			to={to}
			className={cn(styles.button, rest.className, {
				[styles.soon]: soon,
			})}
		>
			{children}
		</Link>
	)
}
