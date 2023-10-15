import { useMemo } from 'react';
import { Combatant } from '../../../interfaces/Combatant';

export const useBattleScreenSelectors = ({
	currentCombatants,
	playerId,
}: {
	currentCombatants: Combatant[];
	playerId: string;
}) => {
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

	return {
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		noCombatantsHaveMoves,
	};
};
