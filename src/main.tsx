import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'framer-motion'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { AppInit } from './AppInit.tsx'
import Router from './components/router/Router.tsx'
import './index.css'
import PWABadge from './PWABadge.tsx'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<LazyMotion features={domAnimation}>
				<Toaster
					position='top-right'
					toastOptions={{
						style: {
							background: '#1f1d2b',
							color: '#fff',
							border: '1px solid rgba(255,255,255,0.1)',
						},
					}}
				/>
				<AppInit />
				<Router />
			</LazyMotion>
		</QueryClientProvider>
		<PWABadge />
	</React.StrictMode>,
)
