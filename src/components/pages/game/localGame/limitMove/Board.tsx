import cn from 'clsx'
import type { BoardProps } from '../../../../../types/types'
import Square from './Square'
import calculateWinner from './Winner'
import styles from './localGame.module.css'

export default function Board({
	squares,
	onPlay,
	xIsNext,
	onCellClick,
	resetGame,
}: BoardProps) {
	function handleClick(i: number) {
		if (calculateWinner(squares) || squares[i]) return

		if (onCellClick) {
			onCellClick(i)
			return
		}

		const nextSquares = squares.slice()
		nextSquares[i] = xIsNext ? 'X' : 'O'
		if (onPlay) onPlay(nextSquares, i)
	}

	const winner = calculateWinner(squares)
	const status = xIsNext ? 'X' : 'O'

	return (
		<>
			{/* Winner overlay */}
			{winner && (
				<div className='absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm'>
					<div
						className='relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-white/[0.08] p-8 shadow-2xl'
						style={{
							background: 'linear-gradient(160deg, #1a1828 0%, #0f0d1a 100%)',
						}}
					>
						<div
							className='absolute inset-x-0 top-0 h-[3px]'
							style={{
								background:
									winner === 'X'
										? 'linear-gradient(90deg, transparent, #818cf8, transparent)'
										: 'linear-gradient(90deg, transparent, #fb7185, transparent)',
							}}
						/>
						<div
							className='pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl opacity-20'
							style={{ background: winner === 'X' ? '#6366f1' : '#f43f5e' }}
						/>
						<div
							className='relative flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg'
							style={{
								background:
									winner === 'X'
										? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
										: 'linear-gradient(135deg, #4c0519 0%, #881337 100%)',
								boxShadow:
									winner === 'X'
										? '0 0 28px rgba(99,102,241,0.3)'
										: '0 0 28px rgba(244,63,94,0.3)',
							}}
						>
							🏆
						</div>
						<div className='relative text-center'>
							<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-white/30'>
								Победитель
							</p>
							<span
								className={cn('text-5xl font-bold', winner === 'X' ? 'X' : 'O')}
							>
								{winner}
							</span>
						</div>
						<button
							onClick={resetGame}
							className='relative mt-1 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95'
							style={{
								background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
								boxShadow: '0 4px 16px rgba(79,70,229,0.35)',
							}}
						>
							Новая игра
						</button>
					</div>
				</div>
			)}

			{/* Turn indicator */}
			<div className='relative mb-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl'>
				{/* Active side glow */}
				<div
					className='absolute inset-y-0 transition-all duration-300'
					style={{
						left: status === 'X' ? 0 : '50%',
						width: '50%',
						background:
							status === 'X'
								? 'linear-gradient(90deg, rgba(99,102,241,0.08), transparent)'
								: 'linear-gradient(270deg, rgba(244,63,94,0.08), transparent)',
					}}
				/>

				<div className='relative flex items-center justify-between px-4 py-3'>
					{/* X side */}
					<div
						className={cn(
							'flex flex-1 items-center gap-3 transition-all duration-300',
							status !== 'X' && 'opacity-30',
						)}
					>
						<span
							className={cn(
								'text-5xl font-bold leading-none',
								status === 'X' ? 'X' : 'X-off',
							)}
						>
							X
						</span>
						{status === 'X' && (
							<span className='rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400'>
								Ход
							</span>
						)}
					</div>

					{/* Center divider */}
					<div className='flex flex-col items-center gap-0.5 px-4'>
						<span className='text-xs font-bold tracking-widest text-white/15'>
							VS
						</span>
					</div>

					{/* O side */}
					<div
						className={cn(
							'flex flex-1 items-center justify-end gap-3 transition-all duration-300',
							status !== 'O' && 'opacity-30',
						)}
					>
						{status === 'O' && (
							<span className='rounded-lg border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-400'>
								Ход
							</span>
						)}
						<span
							className={cn(
								'text-5xl font-bold leading-none',
								status === 'O' ? 'O' : 'O-off',
							)}
						>
							O
						</span>
					</div>
				</div>

				{/* Bottom active bar */}
				<div
					className='h-[2px] transition-all duration-300'
					style={{
						background:
							status === 'X'
								? 'linear-gradient(90deg, rgba(99,102,241,0.6), transparent)'
								: 'linear-gradient(270deg, rgba(244,63,94,0.6), transparent)',
					}}
				/>
			</div>

			{/* Board */}
			<div
				className={cn(
					styles.board,
					'rounded-3xl border border-white/[0.07] bg-white/[0.02] p-2 backdrop-blur-xl',
				)}
			>
				{squares.map((square, index) => (
					<Square
						key={index}
						value={square}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>
		</>
	)
}
