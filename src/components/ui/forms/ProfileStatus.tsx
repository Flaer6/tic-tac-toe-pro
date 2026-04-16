import { Link } from 'react-router-dom'
import { useGetProfile } from '../../../hooks/useGetUser'

export const ProfileStatus = ({ className }: { className?: string }) => {
	const { user } = useGetProfile()

	return (
		<div className=''>
			<Link
				to='/profile'
				className='w-full p-2 inline-flex gap-4 items-center justify-start'
			>
				<div className=''>
					<img
						className='max-w-11 rounded-xl'
						src='/assets/favicons/512x512.jpg'
						alt=''
					/>
				</div>
				<div className={className}>
					<div className='text-xl'>{user?.username}</div>
					<div className='text-primary text-xs'>{user?.publicId}</div>
				</div>
			</Link>
		</div>
	)
}
