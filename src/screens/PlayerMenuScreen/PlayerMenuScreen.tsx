import { LogoutButton } from '../../components/LogoutButton/LogoutButton';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';

export const PlayerMenu = (): JSX.Element => {
	return (
		<div>
			<RouterButton to={RoutesEnum.overworld} text={'Overworld'} />
			<button>Player</button>
			<button>Team</button>
			<button>Pokedex</button>
			<button>Bag</button>
			<button>Quests</button>
			<button>Settings</button>
			<LogoutButton />
		</div>
	);
};
