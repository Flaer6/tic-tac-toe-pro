import { motion } from 'framer-motion'

const cells = Array.from({ length: 9 })

export const Loader = () => {
	return (
		<div className='flex items-center justify-center min-h-[200px] w-full '>
			<div className='grid grid-cols-3'>
				{cells.map((_, i) => (
					<div
						key={i}
						className='w-16 h-16 sm:w-20 sm:h-20 border border-white/10 flex items-center justify-center'
					>
						<motion.span
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
							transition={{
								duration: 1.2,
								repeat: Infinity,
								delay: i * 0.1,
							}}
							className={i % 2 === 0 ? 'text-green-400' : 'text-blue-400'}
						>
							{i % 2 === 0 ? 'X' : 'O'}
						</motion.span>
					</div>
				))}
			</div>
		</div>
	)
}
