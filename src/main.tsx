import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { BattleScreen } from './screens/BattleScreen/BattleScreen';
import { StoryBook } from './storyBook/StoryBook';
import { OPPOID, TRAINERID } from './testing/constants/trainerIds';
import { combatantGenerator } from './testing/generators/combatantGenerator';
import { pokemonGenerator } from './testing/generators/pokemonGenerator';

const router = createBrowserRouter([
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
						}),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({ name: 'ekans', ownerId: OPPOID }),
					}),
					combatantGenerator({
						pokemon: pokemonGenerator({ name: 'koffing', ownerId: OPPOID }),
					}),
				]}
				playerId={TRAINERID}
				opponentIds={[OPPOID]}
			/>
		),
	},
	{ path: '/storybook', element: <StoryBook /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
