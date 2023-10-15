import { useState } from 'react';
import { Combatant } from '../../../interfaces/Combatant';

export const useBattleScreen = (initialCombatants: Combatant[]) => {
	const [currentCombatants] = useState<Combatant[]>(initialCombatants);

	return { currentCombatants };
};
