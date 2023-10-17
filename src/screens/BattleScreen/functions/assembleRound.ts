import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';

export const assembleRound = (combatants: Combatant[]): BattleSnapshot[] => {
	return [
		{
			messages: ['yeye', 'but but but'],
			combatants: combatants.map((c) => {
				return { ...c, nextAction: undefined };
			}),
		},
		{
			messages: ['yoyo'],
			combatants: combatants.map((c) => {
				return { ...c, nextAction: undefined };
			}),
		},
		{
			messages: ['yaya'],
			combatants: combatants.map((c) => {
				return { ...c, nextAction: undefined };
			}),
		},
	];
};
