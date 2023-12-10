import { useEffect } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { oppositeDirection } from '../functions/oppositeDirection';
import { Occupant } from '../interfaces/Occupant';
import { NextFieldInfo } from './useNextField';

export const useTurnTowardsPlayerOnInteraction = (
	currentDialogue: string[],
	nextField: NextFieldInfo,
	occupants: Occupant[],
	setOccupants: (x: Occupant[]) => void,
	orientation: Direction
) => {
	useEffect(() => {
		if (currentDialogue.length > 0 && nextField.occupant) {
			const selectedOccupant = occupants.find(
				(o) => o.id === nextField.occupant?.id
			);
			if (
				selectedOccupant &&
				selectedOccupant.orientation !== oppositeDirection(orientation)
			) {
				setOccupants(
					occupants.map((o) => {
						if (o.id === nextField.occupant?.id) {
							return { ...o, orientation: oppositeDirection(orientation) };
						}
						return o;
					})
				);
			}
		}
	}, [currentDialogue, nextField, occupants, orientation, setOccupants]);
};
