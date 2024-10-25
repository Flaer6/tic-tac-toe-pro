import { FaRobot, FaUser } from 'react-icons/fa'
import Button from '../../ui/buttons/Button'

export default function Home() {
	return (
		<div className='text-center min-h-screen relative'>
			<div className=''>
				<h1 className='text-9xl pt-9 max-md:text-8xl max-sm:text-7xl'>
					Tic Tac Toe
				</h1>
			</div>
			<div className='inline-flex flex-col gap-y-5 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
				<Button to='/game'>
					<FaUser /> VS <FaUser />
				</Button>
				<Button to='/' soon>
					<FaRobot /> VS <FaRobot />
				</Button>
			</div>
		</div>
	)
}
