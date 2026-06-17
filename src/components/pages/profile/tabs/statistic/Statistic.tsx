import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useGetMyStatsQuery } from '../../../../../graphql/generated/output'
import { ModeSelect } from './ModeSelect'
import { StatItem } from './StatItem'
import { statModes, type IStatModes } from './mode.data'
import { getStatsItems } from './statistic.data'

export const Statistic = () => {
	const [mode, setMode] = useState<IStatModes>(statModes[0])

	const { data, loading, error } = useGetMyStatsQuery({
		variables: { mode: mode.value },
		fetchPolicy: 'network-only',
	})

	if (error) toast('Произошла ошибка при загрузки статистики')

	const items = getStatsItems(data?.getMyStats)

	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			{/* Header */}
			<div className='mb-7 flex items-center justify-between'>
				<div className=''>
					<p className='mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400/70'>
						Обзор
					</p>
					<h2 className='text-2xl font-bold text-white sm:text-3xl'>
						Статистика
					</h2>
				</div>
				<div className=''>
					<ModeSelect value={mode} onChange={setMode} />
				</div>
			</div>

			{/* Grid */}
			<div className='relative rounded-3xl border border-white/6 bg-white/2 p-4 sm:p-5 backdrop-blur-xl'>
				<div className='absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />

				{loading ? (
					<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className='h-[84px] animate-pulse rounded-2xl border border-white/5 bg-white/3'
							/>
						))}
					</div>
				) : (
					<motion.div
						className='grid grid-cols-1 gap-3 sm:grid-cols-2'
						initial='hidden'
						animate='show'
						variants={{
							hidden: {},
							show: { transition: { staggerChildren: 0.07 } },
						}}
						key={mode.value}
					>
						{items.map((item, index) => (
							<StatItem key={index} {...item} />
						))}
					</motion.div>
				)}
			</div>
		</div>
	)
}
