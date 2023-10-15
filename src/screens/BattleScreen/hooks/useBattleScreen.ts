import { useCallback, useEffect, useMemo, useState } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { actionGenerator } from '../../../testing/generators/actionGenerator';
import { BattleScreenProps } from '../BattleScreen';
import { updateCombatantInArray } from '../functions/updateCombatantInArray';

export type BattleMode = 'COLLECTING' | 'HANDLING';
export interface UseBattleScreen {
	currentCombatants: Combatant[];
	selectNextActionForCombatant: (id: string, action: Action) => void;
	handleActionForCombatant: (id: string) => void;
	mode: BattleMode;
}

export const useBattleScreen = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): UseBattleScreen => {
	const [mode, setMode] = useState<BattleMode>('COLLECTING');
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
	const noCombatantsHaveMoves = useMemo(() => {
		return currentCombatants.every((c) => !c.nextAction);
	}, [currentCombatants]);

	useEffect(() => {
		if (mode === 'COLLECTING' && allCombatantsHaveMoves) {
			setMode('HANDLING');
		}
	}, [allCombatantsHaveMoves, mode]);
	useEffect(() => {
		if (mode === 'HANDLING' && noCombatantsHaveMoves) {
			setMode('COLLECTING');
		}
	}, [mode, noCombatantsHaveMoves]);
	useEffect(() => {
		if (allPlayerCombatantsHaveMoves && !allCombatantsHaveMoves) {
			setCurrentCombatants(
				currentCombatants.map((c) => {
					return {
						...c,
						nextAction: actionGenerator({
							target: currentCombatants[0].id,
						}),
					};
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
	const handleActionForCombatant = useCallback(
		(id: string) => {
			const combatant = currentCombatants.find((c) => c.id === id);

			if (!combatant) {
				console.error('could not find combatant', id, currentCombatants);
				return;
			}
			const updatedCombatant = { ...combatant, nextAction: undefined };

			const updatedCombatants = updateCombatantInArray(
				currentCombatants,
				updatedCombatant
			);
			setCurrentCombatants(updatedCombatants);
		},
		[currentCombatants]
	);

	return {
		currentCombatants,
		selectNextActionForCombatant,
		mode,
		handleActionForCombatant,
	};
};
