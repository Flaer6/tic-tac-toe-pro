import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetMeQuery } from '../../../../../graphql/generated/output'
import { useProfileUpdate } from '../../../../../hooks/useProfileUpdate'
import type { IUpdateProfileResponse } from '../../../../../types/types'
import { userDate } from '../../../../../utils/createAtUser'
import { SubmitButton } from '../../../../ui/buttons/Submit.btn'
import { InputAuth } from '../../../../ui/inputs/InputAuth'

export const UpdateProfile = () => {
	const { data } = useGetMeQuery()
	const { updateProfileMutate, isUpdating } = useProfileUpdate()
	const createAtUser = userDate(data?.getMe.createdAt)

	const {
		register,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm<IUpdateProfileResponse>({
		defaultValues: {
			firstName: data?.getMe?.firstName || 'hello',
			lastName: data?.getMe?.lastName || '',
		},
	})
	useEffect(() => {
		if (data?.getMe) {
			reset({
				firstName: data?.getMe.firstName || '',
				lastName: data?.getMe.lastName || '',
				username: data?.getMe.username || '',
			})
		}
	}, [data?.getMe, reset])

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

						<span className='text-sm font-medium'>{data?.getMe?.username}</span>
					</div>
				</div>

				<form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-[140px_1fr] items-center gap-4'>
						<label className='text-sm text-muted-foreground'>
							Имя пользователя
						</label>

						<InputAuth
							type='text'
							placeholder='Введите имя пользователя'
							{...register('username')}
						/>
					</div>
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
