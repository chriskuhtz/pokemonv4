import { Headline } from '../../components/Headline/Headline';
import { LogoutButton } from '../../components/LogoutButton/LogoutButton';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';

export const PlayerMenu = (): JSX.Element => {
	return (
		<div className="container">
			<Headline
				text={'Menu'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			<Pill center={'Player'} />
			<Pill center={'Team'} />
			<Pill center={'Pokedex'} />
			<Pill center={'Bag'} />
			<Pill center={'Quests'} />
			<Pill center={'Settings'} />
			<LogoutButton />
		</div>
	);
};
