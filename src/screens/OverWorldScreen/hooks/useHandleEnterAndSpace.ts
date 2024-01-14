import { useCallback } from 'react';
import { useAppDispatch } from '../../../api/store';
import {
	initiateHealerDialogue,
	initiateItemDialogue,
	initiateMerchantDialogue,
	initiateNpcDialogue,
} from '../../../slices/dialogueSlice';
import { focusOccupant, handleOccupants } from '../../../slices/occupantsSlice';
import {
	isHealer,
	isInvisibleBlocker,
	isLargeObstacle,
	isMerchant,
	isNpc,
	isObstacle,
	isOverworldItem,
} from '../functions/OccupantTypeGuards';
import { Occupant } from '../interfaces/Occupant';
import { useHandleOverworldEvent } from './useHandleOverworldEvent';

export const useHandleEnterAndSpace = (
	save: () => void,
	occupant?: Occupant
) => {
	const dispatch = useAppDispatch();
	const handleOverworldEvent = useHandleOverworldEvent(save);

	return useCallback(() => {
		console.log(occupant);
		if (isOverworldItem(occupant) && !occupant.handled) {
			dispatch(initiateItemDialogue(occupant));
			dispatch(handleOccupants([occupant.id]));
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
