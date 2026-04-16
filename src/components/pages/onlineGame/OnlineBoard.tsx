import { m } from 'framer-motion'
import { useGetProfile } from '../../../hooks/useGetUser'
import { socket } from '../../../shared/socket'
import { useOnlineGameStore } from '../../../store/onlineGame.store'

import Square from '../localGame/Square'
import styles from '../localGame/localGame.module.css'
import { WinnerModal } from './WinnerModal'

export function OnlineBoard() {
	const { board, turn, symbol, removingIndex, opponentName, reconnecting } =
		useOnlineGameStore()

	const { user } = useGetProfile()

	const opponentSymbol = symbol === 'X' ? 'O' : symbol === 'O' ? 'X' : null
	const isMyTurn = turn === user?.id

	const handleClick = (index: number) => {
		if (!user || !symbol) return
		if (turn !== user.id) return
		if (board[index] !== null) return

		socket.emit('make_move', { index })
	}

	return (
		<div className='text-white  flex flex-col items-center'>
			<div className='mb-8 w-full max-w-md flex items-center justify-between'>
				<m.div
					animate={{ opacity: isMyTurn ? 1 : 0.5 }}
					className='flex flex-col'
				>
					<span className='text-lg font-semibold'>{user?.username}</span>
					<span className='text-xs text-white/50'>Вы ({symbol})</span>
				</m.div>
				<m.div
					key={turn}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className='text-center'
				>
					<div className='text-xs text-white/40 mb-1'>VS</div>
					<div
						className={`text-sm font-semibold ${
							reconnecting
								? 'text-yellow-400'
								: isMyTurn
									? 'text-green-400'
									: 'text-white/60'
						}`}
					>
						{reconnecting
							? 'Переподключение...'
							: isMyTurn
								? 'Ваш ход'
								: 'Ход соперника'}
					</div>
				</m.div>

				<m.div
					animate={{ opacity: !isMyTurn ? 1 : 0.5 }}
					className='flex flex-col items-end'
				>
					<span className='text-lg font-semibold'>{opponentName}</span>
					<span className='text-xs text-white/50'>({opponentSymbol})</span>
				</m.div>
			</div>

			<div
				className={`
          ${styles.board}
          bg-white/[0.03] border border-white/10 rounded-2xl p-2 backdrop-blur-xl
          ${!isMyTurn || reconnecting ? 'pointer-events-none opacity-70' : ''}
        `}
			>
				{board.map((square, index) => (
					<Square
						key={index}
						value={square}
						removing={index === removingIndex}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>

			<WinnerModal />
		</div>
	)
}
