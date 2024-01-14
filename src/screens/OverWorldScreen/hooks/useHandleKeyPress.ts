import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../api/store';
import { UniqueOccupantIds } from '../../../constants/UniqueOccupantRecord';
import { useIsQuestCompleted } from '../../../hooks/useIsQuestCompleted';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { Direction } from '../../../interfaces/Direction';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { RoutesEnum } from '../../../router/router';
import {
	continueDialogue,
	selectCurrentDialogue,
} from '../../../slices/dialogueSlice';
import {
	handleOccupants,
	selectFocusedOccupant,
} from '../../../slices/occupantsSlice';
import { isHealer, isMerchant, isNpc } from '../functions/OccupantTypeGuards';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import { Merchant } from '../interfaces/Occupants/Occupant';
import { useHandleEnterAndSpace } from './useHandleEnterAndSpace';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	nextField: NextFieldInfo,
	currentPosition: OverworldPosition,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void
) => {
	const dispatch = useAppDispatch();
	const currentDialogue = useSelector(selectCurrentDialogue);
	const focusedOccupant = useSelector(selectFocusedOccupant);
	const isQuestCompleted = useIsQuestCompleted();
	const navigate = useNavigate();
	const save = useSaveGame();
	const openMarketScreen = useCallback(
		async (x: Merchant) => {
			save({ currentPosition });
			navigate(RoutesEnum.market, { state: x.inventory });
		},
		[currentPosition, navigate, save]
	);

	const handleDialogue = useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === ' ' || key === 'Enter') {
				if (currentDialogue.length === 1) {
					if (focusedOccupant && isNpc(focusedOccupant)) {
						dispatch(handleOccupants([focusedOccupant.id]));
						if (focusedOccupant.id in UniqueOccupantIds) {
							save({
								currentPosition,
								handledOccupants: { [focusedOccupant.id]: true },
							});
						}
					}
					if (focusedOccupant && isMerchant(focusedOccupant)) {
						openMarketScreen(focusedOccupant);
						save({ currentPosition });
					}
					if (focusedOccupant && isHealer(focusedOccupant)) {
						save({ currentPosition, visitedNurse: true });
					}
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

	const handleEnterAndSpace = useHandleEnterAndSpace(
		currentPosition,
		nextField.occupant
	);

	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
				handleDialogue(key);
				return;
			}

			//handle enter/space
			if (key === ' ' || (key === 'Enter' && currentDialogue.length === 0)) {
				handleEnterAndSpace();
			}

			//handle orientation
			const nextOrientation = getNewOrientationAfterKeyPress(
				key,
				currentPosition.orientation
			);
			if (nextOrientation && nextOrientation !== currentPosition.orientation) {
				setOrientation(nextOrientation);
				return;
			}

			if (
				isImpassableOccupant(isQuestCompleted, nextField?.occupant) ||
				!nextField.tile
			) {
				return;
			}
			//handle movement
			handleMovement(key);
		},
		[
			currentDialogue,
			currentPosition,
			handleDialogue,
			handleEnterAndSpace,
			handleMovement,
			isQuestCompleted,
			nextField,
			setOrientation,
		]
	);
};
