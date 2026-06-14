import calculateWinner from '../localGame/limitMove/Winner'

type Player = 'X' | 'O' | ''

export function getBotMove(squares: Player[]) {
	const empty = squares
		.map((v, i) => (v === '' ? i : null))
		.filter(v => v !== null) as number[]

	// 🧠 выиграть
	for (const i of empty) {
		const copy = [...squares]
		copy[i] = 'O'
		if (calculateWinner(copy) === 'O') return i
	}

	// 🛑 блок
	for (const i of empty) {
		const copy = [...squares]
		copy[i] = 'X'
		if (calculateWinner(copy) === 'X') return i
	}

	// 🎯 центр
	if (squares[4] === '') return 4

	// 🎲 рандом
	return empty[Math.floor(Math.random() * empty.length)]
}
