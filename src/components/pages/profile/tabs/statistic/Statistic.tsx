import { useGetUserStatsQuery } from '../../../../../graphql/generated/output'
import { StatItem } from './StatItem'
import { getStatsItems } from './statistic.data'

export const Statistic = () => {
	const { data, loading, error } = useGetUserStatsQuery()
	const items = getStatsItems(data?.getUserStats)

	console.log({ data, loading, error })
	if (loading) return <div>Loading...</div>
	return (
		<div className='w-full max-w-4xl p-3 sm:p-4 md:p-6'>
			<div className='mb-6 sm:mb-8'>
				<h2 className='text-2xl font-semibold text-white sm:text-3xl'>
					Статистика
				</h2>
			</div>

			<div className='rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6'>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{items.map((item, index) => (
						<StatItem key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	)
}
