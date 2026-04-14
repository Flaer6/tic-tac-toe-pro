import { useForm } from 'react-hook-form'
import type { IInputSearchUser } from '../../../types/types'
import { SubmitButton } from '../buttons/Submit.btn'
import { InputAuth } from '../inputs/InputAuth'

export const SearchUser = ({ fn }: { fn: () => void }) => {
	const { register } = useForm<IInputSearchUser>()

	return (
		<form onSubmit={fn}>
			<div className='flex items-center gap-10'>
				<InputAuth placeholder='Id or Username' {...register('identifier')} />
				<SubmitButton className='py-1.5'>Найти</SubmitButton>
			</div>
		</form>
	)
}
