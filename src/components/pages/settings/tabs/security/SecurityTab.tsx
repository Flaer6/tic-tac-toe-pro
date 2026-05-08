import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useProfileUpdate } from '../../../../../hooks/useProfileUpdate'
import type { IUpdateProfileResponse } from '../../../../../types/types'

import { useGetProfile } from '../../../../../hooks/useGetUser'
import { SubmitButton } from '../../../../ui/buttons/Submit.btn'
import { InputAuth } from '../../../../ui/inputs/InputAuth'

export const SecurityTab = () => {
	const { user } = useGetProfile()
	const hasPassword = user?.hasPassword
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<IUpdateProfileResponse>()

	const { updateProfileMutate } = useProfileUpdate()

	const onSubmit = (data: IUpdateProfileResponse) => {
		updateProfileMutate(data, {
			onSuccess: () => {
				toast.success(
					hasPassword ? 'Пароль успешно изменен' : 'Пароль успешно создан',
				)

				reset()
			},

			onError: error => {
				toast.error(
					error?.response?.data?.message || 'Ошибка при изменении пароля',
				)
			},
		})
	}

	return (
		<div>
			<div>
				<h2 className='text-xl font-semibold'>Учетная запись</h2>

				<p className='text-primary'>
					Здесь вы можете изменить настройки безопасности вашей учетной записи.
				</p>
			</div>

			<div className='mt-10 max-w-md'>
				<h2 className='text-xl font-semibold'>
					{hasPassword ? 'Сменить пароль' : 'Создать пароль'}
				</h2>

				<form className='mt-6 space-y-5' onSubmit={handleSubmit(onSubmit)}>
					{hasPassword && (
						<div className='grid grid-cols-[140px_1fr] items-center gap-4'>
							<label className='text-sm text-muted-foreground'>
								Текущий пароль
							</label>

							<InputAuth
								type='password'
								placeholder='Введите текущий пароль'
								{...register('oldPassword')}
							/>
						</div>
					)}

					<div className='grid grid-cols-[140px_1fr] items-center gap-4'>
						<label className='text-sm text-muted-foreground'>
							Новый пароль
						</label>

						<InputAuth
							type='password'
							placeholder='Введите новый пароль'
							{...register('newPassword')}
						/>
					</div>

					<div className='grid grid-cols-[140px_1fr] items-center gap-4'>
						<label className='text-sm text-muted-foreground'>
							Подтвердить пароль
						</label>

						<InputAuth
							type='password'
							placeholder='Повторите новый пароль'
							{...register('confirmPassword')}
						/>
					</div>

					<div className='flex justify-start pt-2'>
						<SubmitButton
							disabled={isSubmitting}
							className='disabled:cursor-not-allowed disabled:opacity-50'
						>
							{isSubmitting ? 'Сохранение...' : 'Сохранить'}
						</SubmitButton>
					</div>
				</form>
			</div>
		</div>
	)
}
