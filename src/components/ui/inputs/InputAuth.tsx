import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

export const InputAuth = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	const [showPassword, setShowPassword] = useState(false)

	const isPassword = props.type === 'password'

	return (
		<div className='relative w-full'>
			<input
				ref={ref}
				{...props}
				type={isPassword && showPassword ? 'text' : props.type}
				className='border border-white/10 bg-gradient px-4 py-2 w-full rounded-md outline-none text-white text-[16px] transition bg-[rgba(31,29,43,0.85)] pr-10'
			/>

			{isPassword && (
				<button
					type='button'
					onClick={() => setShowPassword(prev => !prev)}
					className='absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition'
				>
					{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
				</button>
			)}
		</div>
	)
})

InputAuth.displayName = 'InputAuth'
