import cn from 'clsx'

export const SubmitButton = ({
	children,
	className,
	...rest
}: {
	children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={cn(
				className,
				'bg-btn-blue px-7 font-semibold text-lg rounded-xl',
			)}
			type='submit'
			{...rest}
		>
			{children}
		</button>
	)
}
