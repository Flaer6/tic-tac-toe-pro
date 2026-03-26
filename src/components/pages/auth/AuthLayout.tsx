import { AuthBtn } from '../../ui/buttons/Auth.btn'

export const AuthLayout = () => {
	return (
		<div className='inline-flex flex-col gap-3 justify-center text-center'>
			<AuthBtn
				to='/register'
				className='bg-btn-blue text-white hover:bg-btn-blue/80'
			>
				Register
			</AuthBtn>
			<AuthBtn
				to='/login'
				className='bg-gradient hover:bg-white/10 text-white/80'
			>
				Login
			</AuthBtn>
		</div>
	)
}
