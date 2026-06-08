import { Capacitor } from '@capacitor/core'

export const AuthGoogleBtn = () => {
	const handleLogin = async () => {
		const isNative = Capacitor.isNativePlatform()

		if (isNative) {
			// MOBILE FLOW (правильный)
			const { GoogleAuth } =
				await import('@codetrix-studio/capacitor-google-auth')

			const user = await GoogleAuth.signIn()

			await fetch(`${import.meta.env.VITE_API_URL}/auth/google/mobile`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					googleUser: user,
				}),
			})
		} else {
			// WEB FLOW
			window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
		}
	}
	return (
		<button
			onClick={handleLogin}
			className='group flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3 font-medium text-gray-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none active:translate-y-0 mt-5'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 48 48'
				className='h-5 w-5'
			>
				<path
					fill='#FFC107'
					d='M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z'
				/>
				<path
					fill='#FF3D00'
					d='M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z'
				/>
				<path
					fill='#4CAF50'
					d='M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.7 39.5 16.3 44 24 44z'
				/>
				<path
					fill='#1976D2'
					d='M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6 7l6.2 5.2C39.2 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z'
				/>
			</svg>

			<span className='text-sm sm:text-base'>Войти с помощью Google</span>
		</button>
	)
}
