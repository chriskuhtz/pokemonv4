import { createBrowserRouter } from 'react-router-dom';
import { BattleScreen } from '../screens/BattleScreen/BattleScreen';
import { NewGameProcess } from '../screens/NewGameProcessScreen/NewGameProcess';
import { Overworld } from '../screens/OverWorldScreen/Overworld';
import { PlayerCardScreen } from '../screens/PlayerCardScreen/PlayerCardScreen';
import { PlayerMenu } from '../screens/PlayerMenuScreen/PlayerMenuScreen';
import { PokedexScreen } from '../screens/PokedexScreen/PokedexScreen';
import { SaveFileSelection } from '../screens/SaveFileSelectionScreen/SaveFileSelection';
import { StorageScreen } from '../screens/StorageScreen/StorageScreen';
import { TeamScreen } from '../screens/TeamScreen/TeamScreen';
import { OPPOID, TRAINERID } from '../testing/constants/trainerIds';
import { combatantGenerator } from '../testing/generators/combatantGenerator';
import { pokemonGenerator } from '../testing/generators/pokemonGenerator';

export enum RoutesEnum {
	overworld = '/overworld',
	menu = '/menu',
	battle = '/battle',
	newGame = '/newgame',
	playercard = '/playercard',
	team = '/team',
	storage = '/storage',
	pokedex = '/pokedex',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SaveFileSelection />,
	},
	{
		path: RoutesEnum.overworld,
		element: <Overworld />,
	},
	{
		path: RoutesEnum.battle,
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
							dexId: 58,
						}),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({
							name: 'ekans',
							ownerId: OPPOID,
							dexId: 23,
						}),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({
							name: 'koffing',
							ownerId: OPPOID,
							dexId: 109,
						}),
					}),
				]}
				playerId={TRAINERID}
				opponentIds={[OPPOID]}
			/>
		),
	},
	{
		path: RoutesEnum.menu,
		element: <PlayerMenu />,
	},
	{ path: RoutesEnum.playercard, element: <PlayerCardScreen /> },
	{ path: RoutesEnum.team, element: <TeamScreen /> },
	{ path: RoutesEnum.storage, element: <StorageScreen /> },
	{ path: RoutesEnum.pokedex, element: <PokedexScreen /> },
	{
		path: RoutesEnum.newGame,
		element: <NewGameProcess />,
	},
]);
