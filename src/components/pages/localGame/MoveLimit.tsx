export default function applyMoveLimit(
	squares: (string | null)[],
	moveIndices: number[],
	l: string
): (string | null)[] {
	// Если ходов больше 3, удаляем самый старый
	if (moveIndices.length > 3) {
		const oldestMoveIndex = moveIndices[0] // Получаем индекс самого старого хода
		squares[oldestMoveIndex] = null // Удаляем старый символ
	}

	return squares
}
