import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
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
			<AppInit />
			<Router />
		</QueryClientProvider>
		<PWABadge />
	</React.StrictMode>,
)
