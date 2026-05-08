import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetProfile } from '../../../../../hooks/useGetUser'
import { useProfileUpdate } from '../../../../../hooks/useProfileUpdate'
import type { IUpdateProfileResponse } from '../../../../../types/types'
import { SubmitButton } from '../../../../ui/buttons/Submit.btn'
import { InputAuth } from '../../../../ui/inputs/InputAuth'

export const UpdateProfile = () => {
	const { createAtUser, user } = useGetProfile()
	const { updateProfileMutate, isUpdating } = useProfileUpdate()
	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<IUpdateProfileResponse>({
		defaultValues: {
			firstName: user?.firstName || 'hello',
			lastName: user?.lastName || '',
		},
	})
	useEffect(() => {
		if (user) {
			reset({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
			})
		}
	}, [user, reset])

	const onSubmit = (data: IUpdateProfileResponse) => {
		updateProfileMutate(data)
	}
	return (
		<div className='border bg-inner p-6 rounded-2xl border-white/10'>
			<div className='max-w-md space-y-6'>
				<div className='space-y-3'>
					<div className='flex items-center justify-between gap-4  pb-3'>
						<span className='text-sm text-muted-foreground'>
							Дата регистрации
						</span>

						<span className='text-sm font-medium'>{createAtUser}</span>
					</div>

					<div className='flex items-center justify-between gap-4  pb-3'>
						<span className='text-sm text-muted-foreground'>
							Имя пользователя
						</span>

						<span className='text-sm font-medium'>{user?.username}</span>
					</div>
				</div>

				<form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-[140px_1fr] items-center gap-4'>
						<label className='text-sm text-muted-foreground'>Имя</label>

						<InputAuth
							type='text'
							placeholder='Введите имя'
							{...register('firstName')}
						/>
					</div>

					<div className='grid grid-cols-[140px_1fr] items-center gap-4'>
						<label className='text-sm text-muted-foreground'>Фамилия</label>

						<InputAuth
							type='text'
							placeholder='Введите фамилию'
							{...register('lastName')}
						/>
					</div>

					<div className='flex justify-start pt-2'>
						<SubmitButton
							disabled={!isDirty || isUpdating}
							className='disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isUpdating ? 'Сохранение...' : 'Сохранить'}
						</SubmitButton>
					</div>
				</form>
			</div>
		</div>
	)
}
