import { v4 } from 'uuid';
import { Combatant } from '../../interfaces/Combatant';

export const combatantGenerator = (data: Partial<Combatant>): Combatant => {
	return { name: 'testCombatant', id: v4(), ownerId: 'testOwner', ...data };
};
