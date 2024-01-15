import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../api/store';
import { UniqueOccupantIds } from '../../../constants/UniqueOccupantRecord';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { RoutesEnum } from '../../../router/router';
import {
	continueDialogue,
	selectCurrentDialogue,
} from '../../../slices/dialogueSlice';
import {
	selectFocusedOccupant,
	unfocusOccupant,
} from '../../../slices/occupantsSlice';
import { isHealer, isMerchant, isNpc } from '../functions/OccupantTypeGuards';
import { Merchant } from '../interfaces/Occupants/Occupant';

export const useHandleDialogue = (currentPosition: OverworldPosition) => {
	const dispatch = useAppDispatch();
	const currentDialogue = useSelector(selectCurrentDialogue);
	const focusedOccupant = useSelector(selectFocusedOccupant);
	const navigate = useNavigate();
	const save = useSaveGame();

	const openMarketScreen = useCallback(
		async (x: Merchant) => {
			save({ currentPosition });
			navigate(RoutesEnum.market, { state: x.inventory });
		},
		[currentPosition, navigate, save]
	);

	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === ' ' || key === 'Enter') {
				if (currentDialogue.length === 1) {
					if (focusedOccupant && isNpc(focusedOccupant)) {
						if (focusedOccupant.id in UniqueOccupantIds) {
							save({
								currentPosition,
								handledOccupants: { [focusedOccupant.id]: true },
								questUpdates: focusedOccupant.questUpdates,
							});
						}
					}
					if (focusedOccupant && isMerchant(focusedOccupant)) {
						openMarketScreen(focusedOccupant);
						save({
							currentPosition,
							handledOccupants: { [focusedOccupant.id]: true },
							questUpdates: focusedOccupant.questUpdates,
						});
					}
					if (focusedOccupant && isHealer(focusedOccupant)) {
						save({
							currentPosition,
							visitedNurse: true,
							handledOccupants: { [focusedOccupant.id]: true },
							questUpdates: focusedOccupant.questUpdates,
						});
					}
					dispatch(unfocusOccupant());
				}
				dispatch(continueDialogue());
			}
		},
		[
			currentDialogue.length,
			dispatch,
			focusedOccupant,
			save,
			currentPosition,
			openMarketScreen,
		]
	);
};
