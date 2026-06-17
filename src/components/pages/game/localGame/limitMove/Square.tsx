import cn from 'clsx'
import { useSound } from '../../../../../hooks/useSound'
import type { SquareProps } from '../../../../../types/types'
import styles from './localGame.module.css'

export default function Square({
	value,
	onSquareClick,
	removing,
}: SquareProps) {
	const playSound = useSound('/assets/audios/click.mp3')

	return (
		<button
			className={cn(
				styles.square,
				'w-52 h-52 bg-transparent text-9xl font-bold flex items-center justify-center border border-neutral-900 max-md:w-48 max-md:h-48 max-sm:w-36 max-sm:h-36 max-[475px]:w-28 max-[475px]:h-28 max-[475px]:text-8xl outline-none',
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
	)
}
