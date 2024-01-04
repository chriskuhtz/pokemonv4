import { useCallback, useEffect, useState } from 'react';
import { isNpc } from '../functions/isNpc';
import { Merchant, Occupant, OverworldItem } from '../interfaces/Occupant';

export const useCurrentDialogue = (focusedOccupant?: Occupant) => {
	const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);

	useEffect(() => {
		if (isNpc(focusedOccupant) && currentDialogue.length === 0) {
			setCurrentDialogue(focusedOccupant.dialogue);
		}
	}, [currentDialogue, focusedOccupant]);

	const initiateItemDialogue = useCallback((item: OverworldItem) => {
		setCurrentDialogue([`You found a ${item.item}`]);
	}, []);

	const initiateEncounterDialogue = useCallback((name: string) => {
		setCurrentDialogue([`a wild ${name} jumped out of the high grass`]);
	}, []);

	const initiateMerchantDialogue = useCallback((x: Merchant) => {
		setCurrentDialogue(x.dialogue);
	}, []);

	const continueDialogue = () =>
		setCurrentDialogue([...currentDialogue.slice(1)]);

	return {
		currentDialogue,
		initiateItemDialogue,
		continueDialogue,
		initiateEncounterDialogue,
		initiateMerchantDialogue,
	};
};
