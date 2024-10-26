import cn from 'clsx'
import { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGameStore } from '../../../store/store'
import Board from './Board'
import styles from './localGame.module.scss'

export default function Game() {
	const { history, currentMove, handlePlay, xIsNext, resetGame } =
		useGameStore()
	const currentSquares = history[currentMove]
	const [isActive, setIsActive] = useState(false)

	return (
		<div className='flex items-center justify-center px-2'>
			<div className=''>
				<button className={styles.menu} onClick={() => setIsActive(!isActive)}>
					<IoMenu />
				</button>
				<div
					className={cn(
						'absolute top-0 left-0 right-0 bottom-0 z-30 backdrop-blur-sm',
						{ ['hidden']: !isActive }
					)}
					onClick={() => setIsActive(false)}
				>
					<div className='flex flex-col gap-3 items-center z-30 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
						<button
							className='mt-3 px-6 py-2 text-2xl bg-red-500 text-white font-bold hover:bg-red-600'
							onClick={resetGame}
						>
							Новая игра
						</button>
						<Link to='/' className='text-4xl'>
							Главное меню
						</Link>
					</div>
				</div>
			</div>

			<div className='flex flex-col items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-auto'>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
		</div>
	)
}
