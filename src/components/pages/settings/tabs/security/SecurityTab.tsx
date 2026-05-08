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
		<div className='overflow-hidden rounded-3xl border border-white/10 bg-inner p-4 sm:p-6'>
			{/* HEADER */}
			<div>
				<h2 className='text-xl font-semibold text-white sm:text-2xl'>
					Учетная запись
				</h2>

				<p className='mt-2 text-sm text-primary sm:text-base'>
					Здесь вы можете изменить настройки безопасности вашей учетной записи.
				</p>
			</div>

			{/* CONTENT */}
			<div className='mt-8 max-w-2xl'>
				<div className='rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6'>
					<h2 className='text-lg font-semibold text-white sm:text-xl'>
						{hasPassword ? 'Сменить пароль' : 'Создать пароль'}
					</h2>

					<form className='mt-6 space-y-5' onSubmit={handleSubmit(onSubmit)}>
						{/* CURRENT PASSWORD */}
						{hasPassword && (
							<div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4'>
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

						{/* NEW PASSWORD */}
						<div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4'>
							<label className='text-sm text-muted-foreground'>
								Новый пароль
							</label>

							<InputAuth
								type='password'
								placeholder='Введите новый пароль'
								{...register('newPassword')}
							/>
						</div>

						{/* CONFIRM PASSWORD */}
						<div className='grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4'>
							<label className='text-sm text-muted-foreground'>
								Подтвердить пароль
							</label>

							<InputAuth
								type='password'
								placeholder='Повторите новый пароль'
								{...register('confirmPassword')}
							/>
						</div>

						{/* BUTTON */}
						<div className='flex justify-stretch pt-2 sm:justify-start'>
							<SubmitButton
								disabled={isSubmitting}
								className='w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
							>
								{isSubmitting
									? 'Сохранение...'
									: hasPassword
										? 'Изменить пароль'
										: 'Создать пароль'}
							</SubmitButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
