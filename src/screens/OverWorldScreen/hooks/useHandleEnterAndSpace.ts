import { useCallback } from 'react';
import { useAppDispatch } from '../../../api/store';
import {
	initiateHealerDialogue,
	initiateItemDialogue,
	initiateMerchantDialogue,
	initiateNpcDialogue,
} from '../../../slices/dialogueSlice';
import {
	isHealer,
	isMerchant,
	isNpc,
	isObstacle,
	isOverworldItem,
} from '../functions/OccupantTypeGuards';
import { Occupant } from '../interfaces/Occupant';
import { useHandleOverworldEvent } from './useHandleOverworldEvent';

export const useHandleEnterAndSpace = (
	handleOccupants: (x: string[]) => void,
	focusOccupant: (id: string) => void,
	occupant?: Occupant
) => {
	const dispatch = useAppDispatch();
	const handleOverworldEvent = useHandleOverworldEvent();

	return useCallback(() => {
		if (isOverworldItem(occupant) && !occupant.handled) {
			dispatch(initiateItemDialogue(occupant));
			handleOccupants([occupant.id]);
			return;
		}
		if (isNpc(occupant)) {
			focusOccupant(occupant.id);
			dispatch(initiateNpcDialogue(occupant));
			return;
		}
		if (isMerchant(occupant)) {
			focusOccupant(occupant.id);
			dispatch(initiateMerchantDialogue(occupant));
			return;
		}
		if (isHealer(occupant)) {
			focusOccupant(occupant.id);
			dispatch(initiateHealerDialogue());
			return;
		}
		if (isObstacle(occupant) && occupant.onClick) {
			handleOverworldEvent(occupant.onClick);
		}
	}, [
		occupant,
		dispatch,
		handleOccupants,
		focusOccupant,
		handleOverworldEvent,
	]);
};
