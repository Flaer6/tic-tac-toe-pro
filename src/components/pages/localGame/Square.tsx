import cn from 'clsx'
import { useRef } from 'react'
import type { SquareProps } from '../../../types/types'
import styles from './localGame.module.css'

export default function Square({
	value,
	onSquareClick,
	removing,
}: SquareProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null)

	const playSound = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0
			audioRef.current.play()
		}
	}
	return (
		<>
			<button
				className={cn(
					styles.square,

					value == 'X' ? 'X' : 'O',
					{
						'opacity-0 scale-75 transition-all duration-500': removing,
					},
				)}
				onClick={() => {
					onSquareClick()
					playSound()
				}}
			>
				{value}
			</button>
			<audio ref={audioRef} src='/assets/audios/click.mp3' preload='auto' />
		</>
	)
}
