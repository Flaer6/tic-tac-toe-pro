import { Link } from 'react-router-dom'
import type { IProps } from '../../../types/types'

export const AuthBtn = ({ to, children, ...rest }: IProps) => {
	return (
		<Link
			to={to}
			className={`py-2 px-3 rounded-md text-md font-semibold w-full ${rest.className} `}
		>
			{children}
		</Link>
	)
}
