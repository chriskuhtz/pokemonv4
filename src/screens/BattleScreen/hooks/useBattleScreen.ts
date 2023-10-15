import { useCallback, useEffect, useMemo, useState } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { actionGenerator } from '../../../testing/generators/actionGenerator';
import { BattleScreenProps } from '../BattleScreen';
import { updateCombatantInArray } from '../functions/updateCombatantInArray';

export interface UseBattleScreen {
	currentCombatants: Combatant[];
	selectNextActionForCombatant: (id: string, action: Action) => void;
}

export const useBattleScreen = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): UseBattleScreen => {
	const [currentCombatants, setCurrentCombatants] =
		useState<Combatant[]>(initialCombatants);

	const allPlayerCombatantsHaveMoves = useMemo(() => {
		return currentCombatants
			.filter((c) => c.pokemon.ownerId === playerId)
			.every((c) => c.nextAction);
	}, [currentCombatants, playerId]);

	const allCombatantsHaveMoves = useMemo(() => {
		return currentCombatants.every((c) => c.nextAction);
	}, [currentCombatants]);

	useEffect(() => {
		if (allPlayerCombatantsHaveMoves && !allCombatantsHaveMoves) {
			setCurrentCombatants(
				currentCombatants.map((c) => {
					return { ...c, nextAction: actionGenerator() };
				})
			);
		}
	}, [allCombatantsHaveMoves, allPlayerCombatantsHaveMoves, currentCombatants]);

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
