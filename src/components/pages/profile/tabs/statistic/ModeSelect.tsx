import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { statModes, type IStatModes } from './mode.data'

interface ModeSelectProps {
	value: IStatModes
	onChange: (mode: IStatModes) => void
}

export const ModeSelect = ({ value, onChange }: ModeSelectProps) => {
	const [open, setOpen] = useState(false)

	return (
		<div className='relative'>
			<button
				onClick={() => setOpen(p => !p)}
				className='flex items-center gap-2 rounded-[10px] border border-indigo-500/25 bg-indigo-500/8 px-3 py-2 text-[13px] font-medium text-indigo-200 transition hover:border-indigo-500/45 hover:bg-indigo-500/[0.14]'
			>
				{value.label}
				<ChevronDown className='h-3.5 w-3.5 text-indigo-400' />
			</button>

			{open && (
				<div className='absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-xl border border-indigo-500/20 bg-[#13102b] shadow-xl'>
					{statModes.map(m => (
						<button
							key={m.value}
							onClick={() => {
								onChange(m)
								setOpen(false)
							}}
							className={`w-full px-3 py-2 text-left text-[13px] transition hover:bg-indigo-500/10 ${
								value.value === m.value ? 'text-indigo-300' : 'text-white/60'
							}`}
						>
							{m.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
