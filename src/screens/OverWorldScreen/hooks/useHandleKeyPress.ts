import { useCallback } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
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

	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
				handleDialogue(key);
				return;
			}

			//handle click
			if (key === ' ' || (key === 'Enter' && currentDialogue.length === 0)) {
				if (
					nextField.occupant?.type === 'ITEM' &&
					!nextField.occupant.handled
				) {
					setCurrentDialogue([`You found a ${nextField.occupant.item}`]);
					handleOccupants([nextField.occupant.id]);
					return;
				}
				if (nextField.occupant?.type === 'NPC') {
					setCurrentDialogue(nextField.occupant.dialogue);
					toggleFocusForOccupant(nextField.occupant.id);
					return;
				}
			}

			//handle orientation
			const nextOrientation = getNewOrientationAfterKeyPress(key, orientation);
			if (nextOrientation && nextOrientation !== orientation) {
				setOrientation(nextOrientation);
				return;
			}

			if (nextField.occupant || !nextField.tile) {
				return;
			}
			//handle movement
			handleMovement(key);
		},
		[
			currentDialogue.length,
			handleDialogue,
			handleMovement,
			handleOccupants,
			nextField.occupant,
			nextField.tile,
			orientation,
			setCurrentDialogue,
			setOrientation,
			toggleFocusForOccupant,
		]
	);
};
