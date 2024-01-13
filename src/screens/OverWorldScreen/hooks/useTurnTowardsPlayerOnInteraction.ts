import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Direction } from '../../../interfaces/Direction';
import { selectCurrentDialogue } from '../../../slices/dialogueSlice';
import { isHealer, isMerchant, isNpc } from '../functions/OccupantTypeGuards';
import { oppositeDirection } from '../functions/oppositeDirection';
import { Occupant } from '../interfaces/Occupant';
import { NextFieldInfo } from './useNextField';

export const useTurnTowardsPlayerOnInteraction = (
	nextField: NextFieldInfo,
	occupants: Occupant[],
	setOccupants: (x: Occupant[]) => void,
	orientation: Direction
) => {
	const currentDialogue = useSelector(selectCurrentDialogue);
	useEffect(() => {
		if (currentDialogue.length > 0 && nextField.occupant) {
			const selectedOccupant = occupants.find(
				(o) => o.id === nextField.occupant?.id
			);
			if (
				(isNpc(selectedOccupant) ||
					isMerchant(selectedOccupant) ||
					isHealer(selectedOccupant)) &&
				selectedOccupant.orientation !== oppositeDirection(orientation)
			) {
				setOccupants(
					occupants.map((o) => {
						if (o.id === nextField.occupant?.id) {
							return {
								...o,
								orientation: oppositeDirection(orientation),
								watching: false,
							};
						}
						return o;
					})
				);
			}
		}
	}, [currentDialogue, nextField, occupants, orientation, setOccupants]);
};
