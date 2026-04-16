import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const cells = ['X', null, 'O', null, 'X', null, 'O', null, 'X']

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center justify-center px-4 bg-[#1f1d2b] text-white'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4 }}
				className='flex flex-col items-center gap-8'
			>
				{/* BOARD */}
				<div className='grid grid-cols-3'>
					{cells.map((cell, i) => (
						<div
							key={i}
							className='w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-4xl sm:text-5xl font-bold border border-white/10'
						>
							{cell === 'X' && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: i * 0.05 }}
									className='text-green-400'
								>
									X
								</motion.span>
							)}

							{cell === 'O' && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: i * 0.05 }}
									className='text-blue-400'
								>
									O
								</motion.span>
							)}
						</div>
					))}
				</div>

				{/* TEXT */}
				<div className='text-center'>
					<h1 className='text-4xl font-bold mb-2'>404</h1>
					<p className='text-white/60 mb-6'>
						Ты проиграл... страницы не существует 😄
					</p>

					<Link
						to='/'
						className='inline-flex items-center justify-center px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-medium shadow-lg shadow-green-500/20'
					>
						Начать заново
					</Link>
				</div>
			</motion.div>
		</div>
	)
}
