import { useCallback } from 'react';
import { useAppDispatch } from '../../../api/store';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import {
	initiateHealerDialogue,
	initiateItemDialogue,
	initiateMerchantDialogue,
	initiateNpcDialogue,
} from '../../../slices/dialogueSlice';
import { focusOccupant } from '../../../slices/occupantsSlice';
import {
	isHealer,
	isInvisibleBlocker,
	isLargeObstacle,
	isMerchant,
	isNpc,
	isObstacle,
	isOverworldItem,
} from '../functions/OccupantTypeGuards';
import { Occupant } from '../interfaces/Occupants/Occupant';
import { useHandleOverworldEvent } from './useHandleOverworldEvent';

export const useHandleEnterAndSpace = (
	currentPosition: OverworldPosition,
	occupant?: Occupant
) => {
	const dispatch = useAppDispatch();
	const handleOverworldEvent = useHandleOverworldEvent(currentPosition);

	return useCallback(() => {
		if (isOverworldItem(occupant) && !occupant.handled) {
			dispatch(initiateItemDialogue(occupant));
			return;
		}
		if (isNpc(occupant)) {
			dispatch(focusOccupant(occupant.id));
			dispatch(initiateNpcDialogue(occupant));
			return;
		}
		if (isMerchant(occupant)) {
			dispatch(focusOccupant(occupant.id));
			dispatch(initiateMerchantDialogue(occupant));
			return;
		}
		if (isHealer(occupant)) {
			dispatch(focusOccupant(occupant.id));
			dispatch(initiateHealerDialogue());
			return;
		}
		if (
			(isObstacle(occupant) ||
				isLargeObstacle(occupant) ||
				isInvisibleBlocker(occupant)) &&
			occupant?.onClick
		) {
			handleOverworldEvent(occupant.onClick);
		}
	}, [occupant, dispatch, handleOverworldEvent]);
};
