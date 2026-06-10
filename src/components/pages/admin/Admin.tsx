import { motion } from 'framer-motion'
import { ShieldUser } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import {
	useGetAllUsersQuery,
	useGetMeQuery,
	type GetUserQuery,
} from '../../../graphql/generated/output'

const Avatar = ({
	user,
	size = 'md',
}: {
	user: GetUserQuery['getUser']
	size?: 'sm' | 'md'
}) => {
	const cls =
		size === 'sm' ? 'max-h-9 max-w-9 text-xs' : 'max-h-10 max-w-10 text-sm'
	return user.avatar ? (
		<img
			src={user.avatar}
			className={`${cls} w-full shrink-0 rounded-xl object-cover`}
			alt={user.username}
		/>
	) : (
		<div
			className={`${cls} flex shrink-0 items-center justify-center rounded-xl border border-e6 bg-e4 font-semibold text-white/40`}
		>
			{user.firstName?.[0]}
			{user.lastName?.[0]}
		</div>
	)
}

const RoleBadge = ({ role }: { role: string }) => (
	<span
		className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${
			role === 'ADMIN'
				? 'border border-red-500/20 bg-red-500/10 text-red-400'
				: 'border border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
		}`}
	>
		{role}
	</span>
)

export const Admin = () => {
	const { data, loading, error } = useGetAllUsersQuery()
	const { data: meData } = useGetMeQuery()

	if (meData?.getMe.role !== 'ADMIN') return <Navigate to='/' replace />

	const users = data?.getAllUsers.users || []
	const count = data?.getAllUsers.count || 0

	return (
		<div className='min-h-full p-3 text-white sm:p-6'>
			{/* Header */}
			<div className='mb-7'>
				<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
					Панель управления
				</p>
				<div className='flex items-center justify-between'>
					<h1 className='flex items-center gap-2.5 text-2xl font-bold sm:text-3xl'>
						<ShieldUser size={24} className='text-indigo-400' />
						Администрирование
					</h1>
					<div className='flex items-center gap-2 rounded-xl border border-white/6 bg-white/3 px-3 py-1.5'>
						<span className='text-xs text-white/30'>Пользователей</span>
						<span className='text-sm font-bold text-white/80'>{count}</span>
					</div>
				</div>
			</div>

			{/* States */}
			{loading && (
				<div className='flex flex-col gap-2'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className='h-[60px] animate-pulse rounded-2xl border border-white/4 bg-white/2'
						/>
					))}
				</div>
			)}

			{error && (
				<div className='rounded-2xl border border-red-500/20 bg-red-500/6 px-5 py-4 text-sm text-red-400'>
					{error.message}
				</div>
			)}

			{!loading && !error && (
				<>
					{/* Desktop table */}
					<div className='relative hidden overflow-hidden rounded-3xl border border-white/6 bg-[#0b0b0f]/50 backdrop-blur-2xl md:block'>
						<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent' />

						{/* Table header */}
						<div className='grid grid-cols-[2fr_2fr_1fr_1fr] border-b border-white/5 px-5 py-3'>
							{['Пользователь', 'Email', 'Роль', 'Создан'].map(h => (
								<div
									key={h}
									className='text-xs font-semibold uppercase tracking-widest text-white/20'
								>
									{h}
								</div>
							))}
						</div>

						{/* Rows */}
						<motion.div
							initial='hidden'
							animate='show'
							variants={{
								hidden: {},
								show: { transition: { staggerChildren: 0.04 } },
							}}
						>
							{users.map(user => (
								<motion.div
									key={user.id}
									variants={{
										hidden: { opacity: 0 },
										show: { opacity: 1, transition: { duration: 0.2 } },
									}}
								>
									<Link
										to={`/user/${user.id}`}
										className='group grid grid-cols-[2fr_2fr_1fr_1fr] items-center border-b border-white/4 px-5 py-3.5 last:border-b-0 transition-colors duration-150 hover:bg-white/3'
									>
										<div className='flex items-center gap-3'>
											<Avatar user={user} />
											<div className='min-w-0'>
												<div className='truncate text-sm font-medium text-white/90'>
													{user.firstName} {user.lastName}
												</div>
												<div className='text-xs text-white/30'>
													@{user.username}
												</div>
											</div>
										</div>
										<div className='truncate pr-4 text-sm text-white/40'>
											{user.email}
										</div>
										<div>
											<RoleBadge role={user.role} />
										</div>
										<div className='text-xs text-white/30'>
											{new Date(user.createdAt).toLocaleDateString('ru-RU', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</div>
									</Link>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Tablet */}
					<div className='relative hidden overflow-hidden rounded-3xl border border-white/6 bg-white/2 sm:block md:hidden'>
						<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent' />
						<div className='grid grid-cols-[1fr_auto] border-b border-white/5 px-5 py-3'>
							{['Пользователь', 'Роль'].map(h => (
								<div
									key={h}
									className='text-xs font-semibold uppercase tracking-widest text-white/20'
								>
									{h}
								</div>
							))}
						</div>
						{users.map(user => (
							<Link
								to={`/${user.id}`}
								key={user.id}
								className='grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/4 px-5 py-3.5 last:border-b-0 transition-colors hover:bg-white/3'
							>
								<div className='flex items-center gap-3 min-w-0'>
									<Avatar user={user} size='sm' />
									<div className='min-w-0'>
										<div className='truncate text-sm font-medium text-white/90'>
											{user.firstName} {user.lastName}
										</div>
										<div className='truncate text-xs text-white/30'>
											{user.email}
										</div>
									</div>
								</div>
								<div className='flex shrink-0 flex-col items-end gap-1'>
									<RoleBadge role={user.role} />
									<span className='text-xs text-white/25'>
										{new Date(user.createdAt).toLocaleDateString('ru-RU', {
											day: '2-digit',
											month: 'short',
										})}
									</span>
								</div>
							</Link>
						))}
					</div>

					{/* Mobile cards */}
					<div className='flex flex-col gap-2 sm:hidden'>
						{users.map(user => (
							<Link
								to={`/${user.id}`}
								key={user.id}
								className='flex items-center gap-3 rounded-2xl border border-white/6 bg-white/2 p-3 transition-colors hover:bg-white/4 active:scale-[0.99]'
							>
								<Avatar user={user} />
								<div className='min-w-0 flex-1'>
									<div className='flex items-center gap-2'>
										<span className='truncate text-sm font-medium text-white/90'>
											{user.firstName} {user.lastName}
										</span>
										<RoleBadge role={user.role} />
									</div>
									<div className='text-xs text-white/30'>@{user.username}</div>
									<div className='truncate text-xs text-white/20'>
										{user.email}
									</div>
								</div>
								<div className='shrink-0 text-xs text-white/25'>
									{new Date(user.createdAt).toLocaleDateString('ru-RU', {
										day: '2-digit',
										month: 'short',
									})}
								</div>
							</Link>
						))}
					</div>

					{users.length === 0 && (
						<div className='flex flex-col items-center gap-3 py-16 text-center'>
							<ShieldUser className='h-8 w-8 text-white/10' />
							<p className='text-sm text-white/25'>Пользователи не найдены</p>
						</div>
					)}
				</>
			)}
		</div>
	)
}
