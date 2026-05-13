import { CameraIcon, Loader2Icon, UserIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useGetMeQuery } from '../../../../../graphql/generated/output'
import { api } from '../../../../../shared/api/api'

export const AvatarChange = () => {
	const { data, refetch } = useGetMeQuery()

	const inputRef = useRef<HTMLInputElement>(null)

	const [preview, setPreview] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) return

		setPreview(URL.createObjectURL(file))

		try {
			setIsLoading(true)
			const formData = new FormData()
			formData.append('file', file)
			await api.post('/update-profile/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			await refetch()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className='border bg-inner p-6'>
			<div className='flex flex-col gap-8 lg:flex-row lg:items-center'>
				<div className='relative w-fit group'>
					<img
						className='h-40 w-40 rounded-2xl object-cover ring-2 ring-white/10 transition-all duration-300 group-hover:brightness-75'
						src={
							preview || data?.getMe?.avatar || '/assets/favicons/512x512.jpg'
						}
						alt='Avatar'
					/>

					<button
						type='button'
						onClick={() => inputRef.current?.click()}
						className='absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100'
					>
						<div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md'>
							{isLoading ? (
								<Loader2Icon className='h-4 w-4 animate-spin' />
							) : (
								<CameraIcon className='h-4 w-4' />
							)}

							{isLoading ? 'Загрузка...' : 'Изменить'}
						</div>
					</button>

					<input
						ref={inputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleAvatarChange}
					/>
				</div>

				<div className='flex-1'>
					<div className='flex items-center gap-2'>
						<UserIcon className='h-5 w-5 text-emerald-400' />

						<h3 className='text-xl font-semibold'>{data?.getMe?.username}</h3>
					</div>
					<div className=''>
						{data?.getMe?.firstName} {data?.getMe?.lastName}
					</div>
					<p className='mt-2 text-sm text-muted-foreground'>
						ID: {data?.getMe?.publicId}
					</p>

					<div className='mt-6 grid gap-4 sm:grid-cols-2'>
						<div className='rounded-xl border border-white/10 bg-white/[0.03] p-4'>
							<p className='mb-1 text-xs uppercase tracking-wide text-muted-foreground'>
								Email
							</p>

							<p className='truncate text-sm font-medium'>
								{data?.getMe?.email || 'Не указан'}
							</p>
						</div>

						<div className='rounded-xl border border-white/10 bg-white/[0.03] p-4'>
							<p className='mb-1 text-xs uppercase tracking-wide text-muted-foreground'>
								Имя пользователя
							</p>

							<p className='truncate text-sm font-medium'>
								{data?.getMe?.username}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
