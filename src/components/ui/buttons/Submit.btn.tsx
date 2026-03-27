export const SubmitButton = ({
	children,
	...rest
}: {
	children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className='bg-btn-blue py-3 px-7 font-semibold text-lg rounded-xl'
			type='button'
			{...rest}
		>
			{children}
		</button>
	)
}
