import { useCallback } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { Occupant } from '../interfaces/Overworld';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	currentDialogue: string[],
	setCurrentDialogue: (x: string[]) => void,
	setFocusedOccupant: (x: Occupant | undefined) => void,
	nextField: NextFieldInfo,
	orientation: Direction,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void,
	focusedOccupant: Occupant | undefined,
	occupants: Occupant[],
	setOccupants: (x: Occupant[]) => void
) => {
	const handleDialogue = useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === ' ' || key === 'Enter') {
				if (currentDialogue.length === 1) {
					if (focusedOccupant) {
						setOccupants(
							occupants.map((o) => {
								if (o.id === focusedOccupant.id) {
									return { ...o, watching: false };
								}
								return o;
							})
						);

						setFocusedOccupant(undefined);
					}
				}
				setCurrentDialogue([...currentDialogue.slice(1)]);
			}
		},
		[
			currentDialogue,
			focusedOccupant,
			occupants,
			setCurrentDialogue,
			setFocusedOccupant,
			setOccupants,
		]
	);

	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
				handleDialogue(key);
				return;
			}

			//handle click
			if (key === ' ' || key === 'Enter') {
				if (nextField.occupant && currentDialogue.length === 0) {
					setFocusedOccupant(nextField.occupant);

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
			nextField.occupant,
			nextField.tile,
			orientation,
			setFocusedOccupant,
			setOrientation,
		]
	);
};
