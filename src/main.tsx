import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/router/Router.tsx'
import './index.scss'
import PWABadge from './PWABadge.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router />
		<PWABadge />
	</React.StrictMode>
)
