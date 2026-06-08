export default function applyMoveLimit(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	squares: (string | null)[],
	moveIndices: number[],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_p0?: string,
): (string | null)[] {
	// Если ходов больше 3, удаляем самый старый
	if (moveIndices.length > 3) {
		const oldestMoveIndex = moveIndices[0] // Получаем индекс самого старого хода
		squares[oldestMoveIndex] = null // Удаляем старый символ
	}

	return squares
}
