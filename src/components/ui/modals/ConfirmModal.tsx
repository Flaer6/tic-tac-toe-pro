import { AnimatePresence, motion } from 'framer-motion'

interface Props {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	description?: string
	confirmText?: string
	cancelText?: string
}

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Подтверждение',
	description = 'Вы уверены?',
	confirmText = 'Подтвердить',
	cancelText = 'Отмена',
}: Props) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* OVERLAY */}
					<motion.div
						className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					{/* MODAL */}
					<motion.div
						className='fixed inset-0 flex items-center justify-center z-50 px-4'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
					>
						<div
							onClick={e => e.stopPropagation()}
							className='w-full max-w-sm rounded-2xl border border-white/10 bg-[rgba(31,29,43,0.95)] p-6 shadow-2xl'
						>
							{/* TEXT */}
							<div className='mb-5'>
								<h2 className='text-lg font-semibold text-white mb-1'>
									{title}
								</h2>
								<p className='text-sm text-white/60'>{description}</p>
							</div>

							{/* ACTIONS */}
							<div className='flex justify-end gap-3'>
								<button
									onClick={onClose}
									className='px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition'
								>
									{cancelText}
								</button>

								<button
									onClick={() => {
										onConfirm()
										onClose()
									}}
									className='px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm transition'
								>
									{confirmText}
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
