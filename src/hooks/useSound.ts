import { useCallback, useRef } from 'react'

export const useSound = (src: string) => {
	const audioRef = useRef<HTMLAudioElement | null>(null)

	if (!audioRef.current) {
		audioRef.current = new Audio(src)
	}

	return useCallback(() => {
		const audio = audioRef.current
		if (!audio) return
		audio.currentTime = 0
		audio.play().catch(() => {})
	}, [])
}
