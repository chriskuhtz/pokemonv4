import { createBrowserRouter } from 'react-router-dom';
import { BattleScreen } from '../screens/BattleScreen/BattleScreen';
import { StoryBook } from '../storyBook/StoryBook';
import { OPPOID, TRAINERID } from '../testing/constants/trainerIds';
import { combatantGenerator } from '../testing/generators/combatantGenerator';
import { pokemonGenerator } from '../testing/generators/pokemonGenerator';

export const router = createBrowserRouter([
	{
		path: '/',
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
	{ path: '/storybook', element: <StoryBook /> },
]);
