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
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			await refetch()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const me = data?.getMe
	const fullName = [me?.firstName, me?.lastName].filter(Boolean).join(' ')

	return (
		<div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
			{/* Avatar */}
			<div className='relative w-fit shrink-0 group'>
				<div className='relative h-32 w-32 overflow-hidden rounded-2xl ring-2 ring-indigo-500/20 transition-all duration-300 group-hover:ring-indigo-500/40'>
					<img
						className='h-full w-full object-cover transition-all duration-300 group-hover:brightness-60'
						src={preview || me?.avatar || '/assets/favicons/512x512.jpg'}
						alt='Avatar'
					/>

					{/* Hover overlay */}
					<button
						type='button'
						onClick={() => inputRef.current?.click()}
						className='absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100'
					>
						{isLoading ? (
							<Loader2Icon className='h-5 w-5 animate-spin text-white' />
						) : (
							<CameraIcon className='h-5 w-5 text-white' />
						)}
						<span className='text-xs font-semibold text-white'>
							{isLoading ? 'Загрузка…' : 'Изменить'}
						</span>
					</button>
				</div>

				{/* Loading ring */}
				{isLoading && (
					<div className='pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-indigo-400/60 animate-pulse' />
				)}

				<input
					ref={inputRef}
					type='file'
					accept='image/*'
					className='hidden'
					onChange={handleAvatarChange}
				/>
			</div>

			{/* Info */}
			<div className='flex min-w-0 flex-1 flex-col gap-5'>
				{/* Name + id */}
				<div>
					<div className='flex items-center gap-2'>
						<UserIcon className='h-4 w-4 text-indigo-400' />
						<h3 className='text-lg font-bold text-white'>{me?.username}</h3>
						<span className='rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300'>
							#{me?.publicId}
						</span>
					</div>
					{fullName && (
						<p className='mt-0.5 text-sm text-white/40'>{fullName}</p>
					)}
				</div>

				{/* Info grid */}
				<div className='grid gap-3 sm:grid-cols-2'>
					<InfoCell label='Email' value={me?.email || 'Не указан'} />
					<InfoCell label='Имя пользователя' value={me?.username} />
				</div>
			</div>
		</div>
	)
}

function InfoCell({ label, value }: { label: string; value?: string | null }) {
	return (
		<div className='rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-200 hover:bg-white/[0.04]'>
			<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-white/25'>
				{label}
			</p>
			<p className='truncate text-sm font-medium text-white/80'>
				{value || '—'}
			</p>
		</div>
	)
}
