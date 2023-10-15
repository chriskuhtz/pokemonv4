import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BattleScreen } from './screens/BattleScreen/BattleScreen';
import { OPPOID, TRAINERID } from './testing/constants/trainerIds';
import { combatantGenerator } from './testing/generators/combatantGenerator';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BattleScreen
			initialCombatants={[
				combatantGenerator({ name: 'pikachu', ownerId: TRAINERID }),
				combatantGenerator({ name: 'growlithe', ownerId: TRAINERID }),
				combatantGenerator({ name: 'ekans', ownerId: OPPOID }),
				combatantGenerator({ name: 'koffing', ownerId: OPPOID }),
			]}
			playerId={TRAINERID}
			opponentIds={[OPPOID]}
		/>
	</React.StrictMode>
);
