import {
	defineConfig,
	minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
	headLinkOptions: {
		preset: '2023',
	},
	preset,
	images: ['assets/favicons/192x192.png'],
})
