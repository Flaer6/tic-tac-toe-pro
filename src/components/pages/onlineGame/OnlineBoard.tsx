import { useGetProfile } from '../../../hooks/useGetUser'
import { socket } from '../../../shared/socket'

import { useOnlineGameStore } from '../../../store/onlineGame.store'

import Square from '../localGame/Square'
import styles from '../localGame/localGame.module.css'

export function OnlineBoard() {
	const { board, turn, symbol, removingIndex, winner } = useOnlineGameStore()
	const { data: user } = useGetProfile()
	console.log({ turn, symbol, userId: user?.id })
	console.log('BOARD STATE', board)

	const handleClick = (index: number) => {
		console.log('CLICKED', index)

		if (!user) return
		if (!symbol) return
		if (turn !== user.id) return
		if (board[index] !== null) return

		console.log('EMIT MOVE')
		socket.emit('make_move', { index })
	}
	return (
		<div className={styles.board}>
			{board.map((square, index) => (
				<Square
					key={index}
					value={square}
					removing={index === removingIndex}
					onSquareClick={() => handleClick(index)}
				/>
			))}
			{winner && (
				<div className='absolute inset-0 backdrop-blur-sm flex items-center justify-center'>
					<div className='bg-white text-black p-6 rounded text-3xl'>
						Победитель: {winner === user?.id ? 'Вы 🎉' : 'Соперник'}
					</div>
				</div>
			)}
		</div>
	)
}
