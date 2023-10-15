import { useCallback } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { updateCombatantInArray } from '../functions/updateCombatantInArray';

export const useHandleActionForCombatant = ({
	currentCombatants,
	setCurrentCombatants,
}: {
	currentCombatants: Combatant[];
	setCurrentCombatants: (x: Combatant[]) => void;
}) => {
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
		[currentCombatants, setCurrentCombatants]
	);

	const handleActionForCombatant = useCallback(
		(id: string) => {
			const combatant = currentCombatants.find((c) => c.id === id);
			const target = currentCombatants.find(
				(c) => c.id === combatant?.nextAction?.target
			);

			if (!combatant) {
				console.error('could not find combatant', id, currentCombatants);
				return;
			}
			if (!target) {
				console.error('could not find target', id, currentCombatants);
				return;
			}
			const updatedCombatant = {
				...combatant,
				nextAction: undefined,
			};
			const updatedTarget = {
				...target,
				pokemon: {
					...target.pokemon,
					damage: target.pokemon.damage + 10,
				},
			};

			let updatedCombatants = updateCombatantInArray(
				currentCombatants,
				updatedCombatant
			);
			updatedCombatants = updateCombatantInArray(
				updatedCombatants,
				updatedTarget
			);
			setCurrentCombatants(updatedCombatants);
		},
		[currentCombatants, setCurrentCombatants]
	);

	return { selectNextActionForCombatant, handleActionForCombatant };
};
