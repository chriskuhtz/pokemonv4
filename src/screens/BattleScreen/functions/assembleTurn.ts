import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { updateCombatantInArray } from './updateCombatantInArray';

export const assembleTurn = (
	combatants: Combatant[],
	c: Combatant
): { snapshots: BattleSnapshot[]; updatedCombatants: Combatant[] } => {
	const tempCombatants = updateCombatantInArray(combatants, {
		...c,
		nextAction: undefined,
	});
	const target = tempCombatants.find(
		(potentialTarget) => potentialTarget.id === c.nextAction?.target
	);
	return {
		snapshots: [
			{
				messages: [
					`${c.pokemon.name} used an attack against ${target?.pokemon.name}`,
				],
				combatants: [...tempCombatants],
			},
		],
		updatedCombatants: [...tempCombatants],
	};
};
