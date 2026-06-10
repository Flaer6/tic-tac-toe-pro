import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
	appId: 'com.tictactoepro.tie',
	appName: 'Крестики-Нолики Онлайн',
	webDir: 'dist',
	plugins: {
		CapacitorCookies: {
			enabled: true,
		},
	},
}

export default config
