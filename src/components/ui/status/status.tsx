// PremiumBadge.jsx
import { motion } from 'framer-motion'

export function PremiumBadge({ size = 18 }) {
	return (
		<motion.svg
			width={size}
			height={size}
			viewBox='0 0 20 20'
			animate={{ opacity: [0.7, 1, 0.7] }}
			transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
			aria-label='Premium'
		>
			<defs>
				<linearGradient id='premium-grad' x1='0' y1='0' x2='1' y2='1'>
					<stop offset='0%' stopColor='#a78bfa' />
					<stop offset='100%' stopColor='#f59e0b' />
				</linearGradient>
			</defs>
			<circle cx='10' cy='10' r='9' fill='url(#premium-grad)' />
			<path
				d='M10 4.5L11.6 8.1L15.5 8.5L12.7 11L13.6 14.8L10 12.8L6.4 14.8L7.3 11L4.5 8.5L8.4 8.1Z'
				fill='white'
			/>
		</motion.svg>
	)
}
