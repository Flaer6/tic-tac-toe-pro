import cn from 'clsx'
import { Link } from 'react-router-dom'

export const Logo = ({
	state,
	className,
}: {
	state?: boolean
	className?: string
}) => {
	return (
		<Link to='/' className='flex items-center gap-3'>
			<img
				className='w-full max-w-11'
				src='/assets/favicons/512x512.png'
				alt='logo'
			/>
			<span
				className={cn(
					className,
					'font-extrabold text-2xl max-[1079px]:text-xl text-white/80 ',
					{
						hidden: state,
					},
				)}
			>
				Tic Tac Toe
			</span>
		</Link>
	)
}
