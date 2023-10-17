import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../hooks/useBattleScreen';

export const assembleRound = (combatants: Combatant[]): BattleSnapshot[] => {
	return [
		{
			message: 'yeye',
			combatants: combatants.map((c) => {
				return { ...c, nextAction: undefined };
			}),
		},
		{
			message: 'yoyo',
			combatants: combatants.map((c) => {
				return { ...c, nextAction: undefined };
			}),
		},
		{
			message: 'yaya',
			combatants: combatants.map((c) => {
				return { ...c, nextAction: undefined };
			}),
		},
	];
};
