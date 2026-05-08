import { AvatarChange } from './AvatarChange'
import { UpdateProfile } from './UpdateProfile'

export const ProfileTab = () => {
	return (
		<div className='space-y-8'>
			<div>
				<h2 className='mb-2 text-2xl font-semibold'>Профиль</h2>

				<p className='max-w-2xl text-sm text-muted-foreground'>
					Здесь вы можете просмотреть и изменить информацию о вашем профиле.
				</p>
			</div>

			<AvatarChange />
			<UpdateProfile />
		</div>
	)
}
