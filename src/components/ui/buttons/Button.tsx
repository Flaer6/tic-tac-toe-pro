import cn from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

interface IProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
	to: string
	soon?: boolean
}

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
