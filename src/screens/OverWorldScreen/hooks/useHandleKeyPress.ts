import { useCallback } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import { isMerchant, isNpc, isOverworldItem } from '../functions/isNpc';
import { Merchant, Occupant, OverworldItem } from '../interfaces/Occupant';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	currentDialogue: string[],
	focusOccupant: (id: string) => void,
	nextField: NextFieldInfo,
	orientation: Direction,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void,
	focusedOccupant: Occupant | undefined,
	handleOccupants: (x: string[]) => void,
	initiateItemDialogue: (x: OverworldItem) => void,
	initiateMerchantDialogue: (x: Merchant) => void,
	continueDialogue: () => void
) => {
	const handleDialogue = useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === ' ' || key === 'Enter') {
				if (currentDialogue.length === 1) {
					if (focusedOccupant) {
						handleOccupants([focusedOccupant.id]);
					}
				}
				continueDialogue();
			}
		},
		[currentDialogue.length, continueDialogue, focusedOccupant, handleOccupants]
	);

	const handleEnterAndSpace = useCallback(() => {
		if (isOverworldItem(nextField.occupant) && !nextField.occupant.handled) {
			initiateItemDialogue(nextField.occupant);
			handleOccupants([nextField.occupant.id]);
			return;
		}
		if (isNpc(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			return;
		}
		if (isMerchant(nextField.occupant)) {
			initiateMerchantDialogue(nextField.occupant);
			return;
		}
	}, [
		nextField.occupant,
		initiateItemDialogue,
		handleOccupants,
		focusOccupant,
		initiateMerchantDialogue,
	]);

	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
				handleDialogue(key);
				return;
			}

			//handle enter/space
			if (key === ' ' || (key === 'Enter' && currentDialogue.length === 0)) {
				handleEnterAndSpace();
			}

			//handle orientation
			const nextOrientation = getNewOrientationAfterKeyPress(key, orientation);
			if (nextOrientation && nextOrientation !== orientation) {
				setOrientation(nextOrientation);
				return;
			}

			if (isImpassableOccupant(nextField?.occupant) || !nextField.tile) {
				return;
			}
			//handle movement
			handleMovement(key);
		},
		[
			currentDialogue.length,
			handleDialogue,
			handleEnterAndSpace,
			handleMovement,
			nextField?.occupant,
			nextField.tile,
			orientation,
			setOrientation,
		]
	);
};
