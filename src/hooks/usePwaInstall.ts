import { useCallback, useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const usePwaInstall = () => {
	const [installEvent, setInstallEvent] =
		useState<BeforeInstallPromptEvent | null>(null)
	const [isInstalled, setIsInstalled] = useState(false)

	useEffect(() => {
		const handleBeforeInstall = (e: Event) => {
			e.preventDefault()
			setInstallEvent(e as BeforeInstallPromptEvent)
		}

		const handleAppInstalled = () => {
			setIsInstalled(true)
			setInstallEvent(null)
		}

		// если приложение уже открыто как установленное PWA
		if (window.matchMedia('(display-mode: standalone)').matches) {
			setIsInstalled(true)
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstall)
		window.addEventListener('appinstalled', handleAppInstalled)

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [])

	const promptInstall = useCallback(async () => {
		if (!installEvent) return
		await installEvent.prompt()
		const { outcome } = await installEvent.userChoice
		if (outcome === 'accepted') {
			setInstallEvent(null)
		}
	}, [installEvent])

	return {
		canInstall: !!installEvent && !isInstalled,
		isInstalled,
		promptInstall,
	}
}
