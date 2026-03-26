import { Link } from 'react-router-dom'
import type { IProps } from '../../../types/types'

export const AuthBtn = ({ to, children, ...rest }: IProps) => {
	return (
		<Link
			to={to}
			className={`py-2.5 px-11 rounded-md text-lg font-semibold ${rest.className} `}
		>
			{children}
		</Link>
	)
}
