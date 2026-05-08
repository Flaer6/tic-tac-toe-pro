import { animate, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export const useAnimatedNumber = (value: number, duration = 0.6) => {
	const motionValue = useMotionValue(0)

	const rounded = useTransform(motionValue, latest => Math.round(latest))

	useEffect(() => {
		const controls = animate(motionValue, value, {
			duration,
			ease: 'easeOut',
		})

		return controls.stop
	}, [value])

	return rounded
}
