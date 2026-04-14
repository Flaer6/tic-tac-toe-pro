import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-screen text-white'>
			<h1 className='text-4xl mb-4'>404</h1>
			<p className='mb-4'>Страница не найдена</p>
			<Link to='/' className='text-green-400'>
				На главную
			</Link>
		</div>
	)
}
