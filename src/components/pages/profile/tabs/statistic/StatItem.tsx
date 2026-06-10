import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useAnimatedNumber } from '../../../../../hooks/animation/useAnimatedNumber'

type Props = {
	label: string
	value: number
	icon: LucideIcon
	color: string // e.g. 'text-indigo-400'
	bg: string // e.g. 'border-indigo-500/20'
	accent?: string // e.g. 'bg-indigo-500' — left bar color
}

export const StatItem = ({
	label,
	value,
	icon: Icon,
	color,
	bg,
	accent = 'bg-indigo-500',
}: Props) => {
	const animated = useAnimatedNumber(value)

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: 'easeOut' }}
			className={`
				group relative flex items-center gap-4 overflow-hidden
				rounded-2xl border p-5
				transition-all duration-300
				hover:bg-white/[0.04] hover:-translate-y-0.5
				${bg}
			`}
		>
			{/* Left accent bar */}
			<div
				className={`absolute inset-y-0 left-0 w-[3px] rounded-r-full ${accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
			/>

			{/* Text content */}
			<div className='flex min-w-0 flex-1 flex-col gap-0.5 pl-2'>
				<span className='text-xs font-medium uppercase tracking-widest text-white/35'>
					{label}
				</span>
				<motion.span className='text-3xl font-bold tabular-nums text-white'>
					{animated}
				</motion.span>
			</div>

			{/* Icon — watermark style */}
			<div className='relative flex-shrink-0'>
				<Icon
					className={`h-10 w-10 opacity-15 transition-opacity duration-300 group-hover:opacity-25 ${color}`}
				/>
			</div>
		</motion.div>
	)
}
