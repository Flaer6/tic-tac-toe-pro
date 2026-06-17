import { Download } from 'lucide-react'
import { usePwaInstall } from '../../../hooks/usePwaInstall'

export const InstallPwaButton = () => {
	const { canInstall, promptInstall } = usePwaInstall()

	if (!canInstall) return null

	return (
		<button
			onClick={promptInstall}
			className='group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 hover:brightness-110 active:scale-95'
		>
			<span className='absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full' />
			<Download className='h-4 w-4' />
			Установить приложение
		</button>
	)
}
