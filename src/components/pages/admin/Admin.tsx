import { ShieldUser } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import {
	useGetAllUsersQuery,
	useGetMeQuery,
} from '../../../graphql/generated/output'

export const Admin = () => {
	const { data, loading, error } = useGetAllUsersQuery()
	const { data: meData } = useGetMeQuery()

	if (meData?.getMe.role !== 'ADMIN') {
		return <Navigate to='/' replace />
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center h-screen text-gray-400'>
				Loading users...
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-screen text-red-500'>
				{error.message}
			</div>
		)
	}

	const users = data?.getAllUsers.users || []
	const count = data?.getAllUsers.count || 0

	return (
		<div className='min-h-full backdrop-blur-2xl bg-[#0b0b0f]/30 text-white p-3 sm:p-6'>
			{/* HEADER */}
			<div className='flex items-center justify-between mb-4 sm:mb-6'>
				<h1 className='text-lg sm:text-2xl font-bold flex items-center gap-2'>
					<ShieldUser
						size={28}
						className='sm:w-10 sm:h-10 text-white shrink-0'
					/>
					<span className='hidden sm:inline'>Администрирование</span>
					<span className='sm:hidden'>Админ</span>
				</h1>

				<div className='px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#15151c] text-xs sm:text-sm text-gray-300 shrink-0'>
					Users: {count}
				</div>
			</div>

			{/* DESKTOP TABLE */}
			<div className='hidden md:block bg-[#111118] rounded-xl overflow-hidden border border-[#222]'>
				{/* HEADER ROW */}
				<div className='grid grid-cols-4 px-4 py-3 text-xs text-gray-400 border-b border-[#222]'>
					<div>User</div>
					<div>Email</div>
					<div>Role</div>
					<div>Created</div>
				</div>

				{/* ROWS */}
				{users.map(user => (
					<Link
						to={`/${user.id}`}
						key={user.id}
						className='grid grid-cols-4 px-4 py-4 items-center hover:bg-[#1a1a22] transition'
					>
						<div className='flex items-center gap-3'>
							{user.avatar ? (
								<img
									src={
										user.avatar ||
										`https://ui-avatars.com/api/?name=${user.username}&background=random`
									}
									className='max-w-10 max-h-10 rounded-full object-cover shrink-0'
									alt={user.username}
								/>
							) : (
								<div className='max-w-10 max-h-10 rounded-full bg-[#2a2a35] flex items-center justify-center font-bold shrink-0'>
									{user.firstName?.[0]}
									{user.lastName?.[0]}
								</div>
							)}
							<div className='min-w-0'>
								<div className='font-medium truncate'>
									{user.firstName} {user.lastName}
								</div>
								<div className='text-xs text-gray-400 truncate'>
									@{user.username}
								</div>
							</div>
						</div>

						<div className='text-gray-300 text-sm truncate pr-4'>
							{user.email}
						</div>

						<div>
							<span
								className={`px-2 py-1 text-xs rounded-md font-medium ${
									user.role === 'ADMIN'
										? 'bg-red-500/20 text-red-400'
										: 'bg-blue-500/20 text-blue-400'
								}`}
							>
								{user.role}
							</span>
						</div>

						<div className='text-gray-400 text-sm'>
							{new Date(user.createdAt).toLocaleDateString()}
						</div>
					</Link>
				))}
			</div>

			{/* TABLET TABLE (2 columns) */}
			<div className='hidden sm:block md:hidden bg-[#111118] rounded-xl overflow-hidden border border-[#222]'>
				<div className='grid grid-cols-[1fr_auto] px-4 py-3 text-xs text-gray-400 border-b border-[#222]'>
					<div>User</div>
					<div>Role</div>
				</div>

				{users.map(user => (
					<Link
						to={`/${user.id}`}
						key={user.id}
						className='grid grid-cols-[1fr_auto] px-4 py-3 items-center hover:bg-[#1a1a22] transition gap-3 border-b border-[#1a1a22] last:border-0'
					>
						<div className='flex items-center gap-3 min-w-0'>
							{user.avatar ? (
								<img
									src={
										user.avatar ||
										`https://ui-avatars.com/api/?name=${user.username}&background=random`
									}
									className='max-w-9 max-h-9 rounded-full object-cover shrink-0'
									alt={user.username}
								/>
							) : (
								<div className='max-w-9 max-h-9 rounded-full bg-[#2a2a35] flex items-center justify-center font-bold text-sm shrink-0'>
									{user.firstName?.[0]}
									{user.lastName?.[0]}
								</div>
							)}
							<div className='min-w-0'>
								<div className='font-medium text-sm truncate'>
									{user.firstName} {user.lastName}
								</div>
								<div className='text-xs text-gray-400 truncate'>
									{user.email}
								</div>
							</div>
						</div>

						<div className='flex flex-col items-end gap-1 shrink-0'>
							<span
								className={`px-2 py-1 text-xs rounded-md font-medium ${
									user.role === 'ADMIN'
										? 'bg-red-500/20 text-red-400'
										: 'bg-blue-500/20 text-blue-400'
								}`}
							>
								{user.role}
							</span>
							<span className='text-xs text-gray-500'>
								{new Date(user.createdAt).toLocaleDateString()}
							</span>
						</div>
					</Link>
				))}
			</div>

			{/* MOBILE CARDS */}
			<div className='sm:hidden space-y-2'>
				{users.map(user => (
					<Link
						to={`/${user.id}`}
						key={user.id}
						className='flex items-center gap-3 p-3 rounded-xl bg-[#111118] border border-[#222] hover:bg-[#1a1a22] transition active:scale-[0.99]'
					>
						{user.avatar ? (
							<img
								src={
									user.avatar ||
									`https://ui-avatars.com/api/?name=${user.username}&background=random`
								}
								className='max-w-11 max-h-11 rounded-full object-cover shrink-0'
								alt={user.username}
							/>
						) : (
							<div className='w-11 h-11 rounded-full bg-[#2a2a35] flex items-center justify-center font-bold shrink-0'>
								{user.firstName?.[0]}
								{user.lastName?.[0]}
							</div>
						)}

						<div className='min-w-0 flex-1'>
							<div className='flex items-center gap-2 flex-wrap'>
								<span className='font-medium text-sm truncate'>
									{user.firstName} {user.lastName}
								</span>
								<span
									className={`px-1.5 py-0.5 text-[10px] rounded font-medium shrink-0 ${
										user.role === 'ADMIN'
											? 'bg-red-500/20 text-red-400'
											: 'bg-blue-500/20 text-blue-400'
									}`}
								>
									{user.role}
								</span>
							</div>
							<div className='text-xs text-gray-400 truncate'>
								@{user.username}
							</div>
							<div className='text-xs text-gray-500 truncate'>{user.email}</div>
						</div>

						<div className='text-xs text-gray-500 shrink-0'>
							{new Date(user.createdAt).toLocaleDateString('ru', {
								day: '2-digit',
								month: 'short',
							})}
						</div>
					</Link>
				))}
			</div>

			{users.length === 0 && (
				<div className='flex items-center justify-center py-16 text-gray-500 text-sm'>
					No users found
				</div>
			)}
		</div>
	)
}
