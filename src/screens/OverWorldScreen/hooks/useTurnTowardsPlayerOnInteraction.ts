import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../api/store';
import { Direction } from '../../../interfaces/Direction';
import { selectCurrentDialogue } from '../../../slices/dialogueSlice';
import { selectOccupants, setOccupants } from '../../../slices/occupantsSlice';
import { isHealer, isMerchant, isNpc } from '../functions/OccupantTypeGuards';
import { oppositeDirection } from '../functions/oppositeDirection';
import { NextFieldInfo } from './useNextField';

export const useTurnTowardsPlayerOnInteraction = (
	nextField: NextFieldInfo,
	orientation: Direction
) => {
	const currentDialogue = useSelector(selectCurrentDialogue);
	const occupants = useSelector(selectOccupants);
	const dispatch = useAppDispatch();
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
				dispatch(
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
					)
				);
			}
		}
	}, [currentDialogue, dispatch, nextField, occupants, orientation]);
};
