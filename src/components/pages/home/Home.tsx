import { FaRobot, FaUser } from 'react-icons/fa'
import Button from '../../ui/buttons/Button'
import { ProfileStatus } from '../../ui/forms/ProfileStatus'

export default function Home() {
	return (
		<div className='text-center min-h-screen relative flex flex-col gap-32 items-center p-20'>
			<div className='absolute top-3 right-3 bg-gradient rounded-2xl min-[790px]:hidden'>
				<ProfileStatus />
			</div>
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
				<Button to='/' soon>
					<FaRobot /> VS <FaRobot />
				</Button>
			</div>
		</div>
	)
}
