export const userDate = (date: string | undefined): string => {
	if (!date) return ''

	return new Date(date).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}
