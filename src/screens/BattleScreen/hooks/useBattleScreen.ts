import { useState } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { BattleScreenProps } from '../BattleScreen';
import { useAssignActionsToNpcs } from './useAssignActionsToNpcs';
import { useBattleScreenSelectors } from './useBattleScreenSelectors';
import { useHandleActionForCombatant } from './useHandleActionForCombatant';
import { useHandleMode } from './useHandleMode';

export type BattleMode = 'COLLECTING' | 'HANDLING';
export interface UseBattleScreen {
	allCombatantsOnField: Combatant[];
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

	const {
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		noCombatantsHaveMoves,
		allCombatantsOnField,
	} = useBattleScreenSelectors({
		currentCombatants,
		playerId,
	});

	useHandleMode({
		mode,
		allCombatantsHaveMoves,
		noCombatantsHaveMoves,
		setMode,
	});

	useAssignActionsToNpcs({
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		playerId,
		setCurrentCombatants,
		currentCombatants,
	});

	const { handleActionForCombatant, selectNextActionForCombatant } =
		useHandleActionForCombatant({
			currentCombatants,
			setCurrentCombatants,
		});

	return {
		allCombatantsOnField,
		selectNextActionForCombatant,
		mode,
		handleActionForCombatant,
	};
};
