import { useCallback, useState } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { updateCombatantInArray } from '../functions/updateCombatantInArray';

export interface UseBattleScreen {
	currentCombatants: Combatant[];
	selectNextActionForCombatant: (id: string, action: Action) => void;
}
export const useBattleScreen = (
	initialCombatants: Combatant[]
): UseBattleScreen => {
	const [currentCombatants, setCurrentCombatants] =
		useState<Combatant[]>(initialCombatants);

	const selectNextActionForCombatant = useCallback(
		(id: string, action: Action) => {
			const combatant = currentCombatants.find((c) => c.id === id);

			if (!combatant) {
				console.error(
					'could not find combatant',
					id,
					action,
					currentCombatants
				);
				return;
			}
			const updatedCombatant = { ...combatant, nextAction: action };

			const updatedCombatants = updateCombatantInArray(
				currentCombatants,
				updatedCombatant
			);
			setCurrentCombatants(updatedCombatants);
		},
		[currentCombatants]
	);
	return { currentCombatants, selectNextActionForCombatant };
};
