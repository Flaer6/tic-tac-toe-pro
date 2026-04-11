import { AuthBtn } from '../../ui/buttons/Auth.btn'

export const AuthLayout = () => {
	return (
		<div className='inline-flex  gap-3 justify-center text-center p-3 z-20 absolute top-0 left-0'>
			<AuthBtn
				to='/register'
				className='bg-btn-blue text-white hover:bg-btn-blue/80'
			>
				Зарегистрироваться
			</AuthBtn>
			<AuthBtn
				to='/login'
				className='bg-gradient hover:bg-white/10 text-white/80'
			>
				Войти
			</AuthBtn>
		</div>
	)
}
