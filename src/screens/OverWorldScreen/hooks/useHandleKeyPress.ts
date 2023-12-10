import { useCallback } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import { isNpc } from '../functions/isNpc';
import { Occupant } from '../interfaces/Occupant';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	currentDialogue: string[],
	setCurrentDialogue: (x: string[]) => void,
	toggleFocusForOccupant: (id: string) => void,
	nextField: NextFieldInfo,
	orientation: Direction,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void,
	focusedOccupant: Occupant | undefined,
	handleOccupants: (x: string[]) => void
) => {
	const handleDialogue = useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === ' ' || key === 'Enter') {
				if (currentDialogue.length === 1) {
					if (focusedOccupant) {
						handleOccupants([focusedOccupant.id]);
					}
				}
				setCurrentDialogue([...currentDialogue.slice(1)]);
			}
		},
		[currentDialogue, setCurrentDialogue, focusedOccupant, handleOccupants]
	);

	const handleEnterAndSpace = useCallback(() => {
		if (nextField.occupant?.type === 'ITEM' && !nextField.occupant.handled) {
			setCurrentDialogue([`You found a ${nextField.occupant.item}`]);
			handleOccupants([nextField.occupant.id]);
			return;
		}
		if (isNpc(nextField.occupant)) {
			setCurrentDialogue(nextField.occupant.dialogue);
			toggleFocusForOccupant(nextField.occupant.id);
			return;
		}
	}, [handleOccupants, nextField, setCurrentDialogue, toggleFocusForOccupant]);

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
