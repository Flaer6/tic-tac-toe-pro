import { useGameSocket } from '../../../hooks/useGameSocket'
import { OnlineBoard } from './OnlineBoard'

export const OnlineGame = () => {
	const { handleFind, handleCancel, status } = useGameSocket()

	return (
		<div className='flex flex-col items-center gap-4'>
			{status === 'idle' && (
				<button
					className='px-6 py-2 bg-blue-600 text-white rounded'
					onClick={handleFind}
				>
					Найти игру
				</button>
			)}

			{status === 'searching' && (
				<>
					<p className='text-xl'>🔎 Идёт поиск соперника...</p>
					<button
						className='px-4 py-1 bg-red-500 text-white rounded'
						onClick={handleCancel}
					>
						Отменить
					</button>
				</>
			)}

			{status === 'found' && (
				<>
					<p className='text-xl text-green-500'>🎮 Игра найдена!</p>
					<OnlineBoard />
				</>
			)}
		</div>
	)
}
