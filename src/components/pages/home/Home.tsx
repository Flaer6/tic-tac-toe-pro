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
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-[#070B14]/90 backdrop-blur-md'>
				<Loader />
			</div>
		)
	}

	return (
		<div className='relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden'>
			{/* Mobile profile */}
			{isAuth && (
				<div className='absolute top-4 right-4 min-[790px]:hidden z-10'>
					<ProfileStatus />
				</div>
			)}

			{/* Title */}
			<div className='text-center mb-20'>
				<h1 className='font-rubik font-bold tracking-tight text-white text-8xl max-md:text-7xl max-sm:text-6xl leading-none'>
					Tic{' '}
					<span className='bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent'>
						Tac
					</span>{' '}
					Toe
				</h1>
				<div className='mt-6 flex items-center justify-center gap-4'>
					<div className='h-px w-16 bg-gradient-to-r from-transparent to-white/20' />
					<p className='text-xs font-semibold uppercase tracking-[0.25em] text-white/25'>
						Выбери режим игры
					</p>
					<div className='h-px w-16 bg-gradient-to-l from-transparent to-white/20' />
				</div>
			</div>

			{/* Buttons */}
			<div className='flex flex-col gap-5 w-full max-w-sm'>
				<Button to='/game'>
					<FaUser /> VS <FaUser />
				</Button>
				<Button to='/online'>
					<span className='h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]' />
					Online
				</Button>
				<Button to='/ai'>
					<FaRobot /> VS <FaRobot />
				</Button>
			</div>
		</div>
	)
}
