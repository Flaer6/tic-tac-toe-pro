import { FaRobot, FaUser } from 'react-icons/fa'
import { useGetMeQuery } from '../../../graphql/generated/output'
import Button from '../../ui/buttons/Button'
import { ProfileStatus } from '../../ui/forms/ProfileStatus'
import { Loader } from '../../ui/Loader'

export default function Home() {
	const { data, loading } = useGetMeQuery()

	const isAuth = !!data?.getMe
	if (loading) {
		return (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1f1d2b]/80 backdrop-blur-sm'>
				<Loader />
			</div>
		)
	}

	return (
		<div className='text-center min-h-screen relative flex flex-col gap-32 items-center p-20'>
			{isAuth && (
				<div className='absolute top-3 right-3 bg-gradient rounded-2xl min-[790px]:hidden'>
					<ProfileStatus />
				</div>
			)}
			<div className=''>
				<h1 className='text-9xl max-md:text-8xl max-sm:text-7xl font-rubik text-primary'>
					Tic Tac Toe
				</h1>
			</div>
			<div className='inline-flex flex-col gap-y-5 max-w-fit'>
				<Button to='/game'>
					<FaUser /> VS <FaUser />
				</Button>
				<Button to='/online'>Online</Button>
				<Button to='/game-vs-ai'>
					<FaRobot /> VS <FaRobot />
				</Button>
			</div>
		</div>
	)
}
