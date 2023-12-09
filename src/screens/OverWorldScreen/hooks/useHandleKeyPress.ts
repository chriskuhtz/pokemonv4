import { useCallback } from 'react';
import { Direction } from '../../../interfaces/Direction';
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
	setOccupants: (x: Occupant[]) => void,
	setHandledTrainers: (x: string[]) => void,
	handledTrainers: string[]
) => {
	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
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
							if (!handledTrainers.some((h) => focusedOccupant.id === h)) {
								setHandledTrainers([...handledTrainers, focusedOccupant.id]);
							}

							setFocusedOccupant(undefined);
						}
					}
					setCurrentDialogue([...currentDialogue.slice(1)]);
				}
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
			focusedOccupant,
			handleMovement,
			handledTrainers,
			nextField.occupant,
			nextField.tile,
			occupants,
			orientation,
			setCurrentDialogue,
			setFocusedOccupant,
			setHandledTrainers,
			setOccupants,
			setOrientation,
		]
	);
};
