import { forwardRef } from 'react'

export const InputAuth = forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
	return (
		<input
			ref={ref}
			{...props}
			className='border border-white/10 bg-gradient px-4 py-2 w-full rounded-md outline-none text-white text-[16px] transition bg-[rgba(31,29,43,0.85)]'
		/>
	)
})

InputAuth.displayName = 'InputAuth'
