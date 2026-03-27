import type { HTMLAttributes } from 'react'

export const AuthForm = ({
	children,
	...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLFormElement>) => {
	return (
		<form {...rest}>
			<div className='max-w-md mx-auto w-full p-6 rounded-lg flex flex-col items-center gap-6'>
				<div className='flex flex-col items-center gap-4  w-full'>
					{children}
				</div>
			</div>
		</form>
	)
}
