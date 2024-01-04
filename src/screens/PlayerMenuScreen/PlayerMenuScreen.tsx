import { Headline } from '../../components/Headline/Headline';
import { LogoutButton } from '../../components/LogoutButton/LogoutButton';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';

export const PlayerMenu = (): JSX.Element => {
	return (
		<div className="container">
			<Headline
				text={'Menu'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			<RouterButton to={RoutesEnum.playercard} text={'Trainercard'} />
			<RouterButton to={RoutesEnum.team} text={'Team'} />
			<RouterButton to={RoutesEnum.storage} text={'Storage'} />
			<RouterButton to={RoutesEnum.pokedex} text={'Pokedex'} />
			<RouterButton to={RoutesEnum.bag} text={'Bag'} />

			<Pill center={'Quests'} />

			<LogoutButton />
		</div>
	);
};
