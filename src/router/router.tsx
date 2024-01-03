import { createBrowserRouter } from 'react-router-dom';
import { BattleScreen } from '../screens/BattleScreen/BattleScreen';
import { NewGameProcess } from '../screens/NewGameProcessScreen/NewGameProcess';
import { Overworld } from '../screens/OverWorldScreen/Overworld';
import { PlayerCardScreen } from '../screens/PlayerCardScreen/PlayerCardScreen';
import { PlayerMenu } from '../screens/PlayerMenuScreen/PlayerMenuScreen';
import { SaveFileSelection } from '../screens/SaveFileSelectionScreen/SaveFileSelection';
import { OPPOID, TRAINERID } from '../testing/constants/trainerIds';
import { combatantGenerator } from '../testing/generators/combatantGenerator';
import { pokemonGenerator } from '../testing/generators/pokemonGenerator';
import { TeamScreen } from '../screens/TeamScreen/TeamScreen';

export enum RoutesEnum {
	overworld = '/overworld',
	menu = '/menu',
	battle = '/battle',
	newGame = '/newgame',
	playercard = '/playercard',
	team = '/team',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SaveFileSelection />,
	},
	{
		path: '/overworld',
		element: <Overworld />,
	},
	{
		path: '/battle',
		element: (
			<BattleScreen
				initialCombatants={[
					combatantGenerator({
						pokemon: pokemonGenerator({ name: 'pikachu', ownerId: TRAINERID }),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({
							name: 'growlithe',
							ownerId: TRAINERID,
							dexId: '58',
						}),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({
							name: 'ekans',
							ownerId: OPPOID,
							dexId: '23',
						}),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({
							name: 'koffing',
							ownerId: OPPOID,
							dexId: '109',
						}),
					}),
				]}
				playerId={TRAINERID}
				opponentIds={[OPPOID]}
			/>
		),
	},
	{
		path: '/menu',
		element: <PlayerMenu />,
	},
	{ path: '/playercard', element: <PlayerCardScreen /> },
	{ path: '/team', element: <TeamScreen /> },
	{
		path: '/newgame',
		element: <NewGameProcess />,
	},
]);
