import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../api/store';
import { useIsQuestCompleted } from '../../../hooks/useIsQuestCompleted';
import { Direction } from '../../../interfaces/Direction';
import { RoutesEnum } from '../../../router/router';
import {
	continueDialogue,
	selectCurrentDialogue,
} from '../../../slices/dialogueSlice';
import { isHealer, isMerchant, isNpc } from '../functions/OccupantTypeGuards';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import { Merchant, Occupant } from '../interfaces/Occupant';
import { useHandleEnterAndSpace } from './useHandleEnterAndSpace';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	focusOccupant: (id: string) => void,
	nextField: NextFieldInfo,
	orientation: Direction,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void,
	focusedOccupant: Occupant | undefined,
	handleOccupants: (x: string[]) => void,
	healTeam: () => void,
	save: () => void
) => {
	const dispatch = useAppDispatch();
	const currentDialogue = useSelector(selectCurrentDialogue);
	const isQuestCompleted = useIsQuestCompleted();
	const navigate = useNavigate();
	const openMarketScreen = useCallback(
		async (x: Merchant) => {
			save();
			navigate(RoutesEnum.market, { state: x.inventory });
		},
		[navigate, save]
	);

	const handleDialogue = useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === ' ' || key === 'Enter') {
				if (currentDialogue.length === 1) {
					if (focusedOccupant && isNpc(focusedOccupant)) {
						handleOccupants([focusedOccupant.id]);
					}
					if (focusedOccupant && isMerchant(focusedOccupant)) {
						openMarketScreen(focusedOccupant);
					}
					if (focusedOccupant && isHealer(focusedOccupant)) {
						healTeam();
					}
				}
				dispatch(continueDialogue());
			}
		},
		[
			currentDialogue,
			dispatch,
			focusedOccupant,
			handleOccupants,
			openMarketScreen,
			healTeam,
		]
	);

	const handleEnterAndSpace = useHandleEnterAndSpace(
		handleOccupants,
		focusOccupant,
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
			const nextOrientation = getNewOrientationAfterKeyPress(key, orientation);
			if (nextOrientation && nextOrientation !== orientation) {
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
			currentDialogue.length,
			handleDialogue,
			handleEnterAndSpace,
			handleMovement,
			isQuestCompleted,
			nextField?.occupant,
			nextField.tile,
			orientation,
			setOrientation,
		]
	);
};
