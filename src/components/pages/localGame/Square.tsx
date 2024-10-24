import { SquareProps } from '../../../types/types'

export default function Square({ value, onSquareClick }: SquareProps) {
	return (
		<button
			className='w-16 h-16 bg-blue-500 text-white text-2xl font-bold flex items-center justify-center hover:bg-blue-600 border border-blue-700'
			onClick={onSquareClick}
		>
			{value}
		</button>
	)
}
