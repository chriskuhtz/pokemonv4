import { createBrowserRouter } from 'react-router-dom';
import { BattleScreen } from '../screens/BattleScreen/BattleScreen';
import { Overworld } from '../screens/OverWorldScreen/Overworld';
import { PlayerMenu } from '../screens/PlayerMenuScreen/PlayerMenuScreen';
import { OPPOID, TRAINERID } from '../testing/constants/trainerIds';
import { combatantGenerator } from '../testing/generators/combatantGenerator';
import { pokemonGenerator } from '../testing/generators/pokemonGenerator';
import { SaveFileSelection } from '../screens/SaveFileSelectionScreen/SaveFileSelection';

export enum Routes {
	'overworld',
	'menu',
	'battle',
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
]);
