// AdminLabel.jsx
import { motion } from 'framer-motion'

const StarIcon = ({ size = 12 }) => (
	<svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
		<defs>
			<linearGradient
				id='al-icon'
				x1='0'
				y1='0'
				x2='32'
				y2='32'
				gradientUnits='userSpaceOnUse'
			>
				<stop offset='0%' stopColor='#93c5fd' />
				<stop offset='100%' stopColor='#67e8f9' />
			</linearGradient>
		</defs>
		<circle cx='16' cy='16' r='14' fill='rgba(255,255,255,.12)' />
		<path
			d='M16 5.5L17.9 10.8L23.5 10.8L19.1 14.1L20.8 19.4L16 16.3L11.2 19.4L12.9 14.1L8.5 10.8L14.1 10.8Z'
			fill='url(#al-icon)'
		/>
		<path
			d='M11.5 24.5C13.2 23 16 23 16 23C16 23 18.8 23 20.5 24.5'
			stroke='rgba(147,197,253,.6)'
			strokeWidth='1.2'
			strokeLinecap='round'
		/>
	</svg>
)

// variant: "pill" | "flat"
export function AdminLabel({ label = 'Admin', variant = 'pill' }) {
	if (variant === 'flat')
		return (
			<span
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: 4,
					padding: '2px 8px',
					borderRadius: 4,
					background: 'rgba(29,78,216,.15)',
					border: '1px solid rgba(59,130,246,.3)',
				}}
			>
				<StarIcon size={11} />
				<span
					style={{
						fontSize: 11,
						fontWeight: 500,
						color: '#93c5fd',
						letterSpacing: '.03em',
					}}
				>
					{label}
				</span>
			</span>
		)

	return (
		<motion.span
			animate={{
				y: [0, -1.5, 0],
				boxShadow: [
					'0 0 0 0 rgba(59,130,246,0)',
					'0 0 10px 2px rgba(59,130,246,.22)',
					'0 0 0 0 rgba(59,130,246,0)',
				],
			}}
			transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 5,
				padding: '2px 9px 2px 6px',
				borderRadius: 20,
				background:
					'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0369a1 100%)',
				border: '1px solid rgba(147,197,253,.25)',
				overflow: 'hidden',
				position: 'relative',
			}}
		>
			<motion.span
				aria-hidden
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(105deg, transparent 30%, rgba(255,255,255,.13) 50%, transparent 70%)',
				}}
				animate={{ x: ['-120%', '220%'] }}
				transition={{
					duration: 3.2,
					repeat: Infinity,
					ease: 'easeInOut',
					repeatDelay: 0.8,
				}}
			/>
			<StarIcon size={13} />
			<span
				style={{
					fontSize: 11,
					fontWeight: 500,
					color: '#bfdbfe',
					letterSpacing: '.04em',
					position: 'relative',
				}}
			>
				{label}
			</span>
		</motion.span>
	)
}
