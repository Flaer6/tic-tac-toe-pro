import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useAnimatedNumber } from '../../../../../hooks/animation/useAnimatedNumber'

type Props = {
	label: string
	value: number
	icon: LucideIcon
	color: string
	bg: string
}

export const StatItem = ({ label, value, icon: Icon, color, bg }: Props) => {
	const animated = useAnimatedNumber(value)

	return (
		<div
			className={`flex items-center justify-between rounded-2xl border p-4 transition hover:bg-white/[0.04] ${bg}`}
		>
			<div className='flex items-center gap-3'>
				<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5'>
					<Icon className={`h-5 w-5 ${color}`} />
				</div>

				<div>
					<div className='text-sm text-white/50'>{label}</div>

					<motion.div className='text-lg font-semibold text-white'>
						{animated}
					</motion.div>
				</div>
			</div>

			<div className='text-xs text-white/40'>#info</div>
		</div>
	)
}
