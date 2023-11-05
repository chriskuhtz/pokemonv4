import { useCallback } from 'react';
import { Direction } from '../interfaces/Overworld';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	currentDialogue: string[],
	setCurrentDialogue: (x: string[]) => void,
	nextField: NextFieldInfo,
	orientation: Direction,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void,
	playerLocked: boolean
) => {
	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
				if (key === ' ' || key === 'Enter') {
					setCurrentDialogue([...currentDialogue.slice(1)]);
				}
				return;
			}

			//handle click
			if (key === ' ' || key === 'Enter') {
				if (nextField.occupant && currentDialogue.length === 0) {
					setCurrentDialogue(nextField.occupant.dialogue);

					return;
				}
			}
			if (playerLocked) {
				return;
			}
			//handle orientation
			if ((key === 'w' || key === 'ArrowUp') && orientation !== 'Up') {
				setOrientation('Up');
				return;
			}
			if ((key === 's' || key === 'ArrowDown') && orientation !== 'Down') {
				setOrientation('Down');
				return;
			}
			if ((key === 'd' || key === 'ArrowRight') && orientation !== 'Right') {
				setOrientation('Right');
				return;
			}
			if ((key === 'a' || key === 'ArrowLeft') && orientation !== 'Left') {
				setOrientation('Left');
				return;
			}
			if (nextField.occupant || !nextField.tile) {
				return;
			}
			//handle movement
			handleMovement(key);
		},
		[
			currentDialogue,
			handleMovement,
			nextField.occupant,
			nextField.tile,
			orientation,
			playerLocked,
			setCurrentDialogue,
			setOrientation,
		]
	);
};
