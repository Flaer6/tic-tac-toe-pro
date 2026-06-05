import { Link } from 'react-router-dom'
import { useGetMeQuery } from '../../../graphql/generated/output'

export const ProfileStatus = ({ className }: { className?: string }) => {
	const { data } = useGetMeQuery()
	if (!data?.getMe) {
		return null
	}
	return (
		<div className=''>
			<Link
				to='/profile'
				className='w-full p-2 inline-flex gap-4 items-center justify-start'
			>
				<div className=''>
					<img
						className='max-w-11 rounded-xl'
						src={data?.getMe?.avatar || '/assets/favicons/512x512.jpg'}
						alt=''
					/>
				</div>
				<div className={className}>
					<div className='text-xl'>{data?.getMe?.username}</div>
					<div className='text-primary text-xs'>{data?.getMe?.publicId}</div>
				</div>
			</Link>
		</div>
	)
}
