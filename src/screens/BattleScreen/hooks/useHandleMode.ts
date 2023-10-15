import { useEffect } from 'react';
import { BattleMode } from './useBattleScreen';

export const useHandleMode = ({
	mode,
	allCombatantsHaveMoves,
	noCombatantsHaveMoves,
	setMode,
}: {
	mode: BattleMode;
	setMode: (x: BattleMode) => void;
	allCombatantsHaveMoves: boolean;
	noCombatantsHaveMoves: boolean;
}) => {
	useEffect(() => {
		if (mode === 'COLLECTING' && allCombatantsHaveMoves) {
			setMode('HANDLING');
		}
	}, [allCombatantsHaveMoves, mode, setMode]);
	useEffect(() => {
		if (mode === 'HANDLING' && noCombatantsHaveMoves) {
			setMode('COLLECTING');
		}
	}, [mode, noCombatantsHaveMoves, setMode]);
};
