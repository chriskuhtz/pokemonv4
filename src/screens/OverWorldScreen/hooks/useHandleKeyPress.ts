import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../api/store';
import { Direction } from '../../../interfaces/Direction';
import { RoutesEnum } from '../../../router/router';
import {
	continueDialogue,
	initiateHealerDialogue,
	initiateItemDialogue,
	initiateMerchantDialogue,
	initiateNpcDialogue,
	selectCurrentDialogue,
} from '../../../slices/dialogueSlice';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import {
	isHealer,
	isMerchant,
	isNpc,
	isObstacle,
	isOverworldItem,
} from '../functions/isNpc';
import { Merchant, Occupant } from '../interfaces/Occupant';
import { OverworldEvent } from '../interfaces/OverworldEvent';
import { useIsQuestCompleted } from './useIsQuestCompleted';
import { NextFieldInfo } from './useNextField';

export const useHandleOverworldEvent = () => {
	const navigate = useNavigate();
	return useCallback(
		(event: OverworldEvent) => {
			if (event.type === 'ROUTE') {
				navigate(event.to);
			}
		},
		[navigate]
	);
};

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
	const handleOverworldEvent = useHandleOverworldEvent();

	const handleEnterAndSpace = useCallback(() => {
		if (isOverworldItem(nextField.occupant) && !nextField.occupant.handled) {
			dispatch(initiateItemDialogue(nextField.occupant));
			handleOccupants([nextField.occupant.id]);
			return;
		}
		if (isNpc(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			dispatch(initiateNpcDialogue(nextField.occupant));
			return;
		}
		if (isMerchant(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			dispatch(initiateMerchantDialogue(nextField.occupant));
			return;
		}
		if (isHealer(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			dispatch(initiateHealerDialogue());
			return;
		}
		if (isObstacle(nextField.occupant) && nextField.occupant.onClick) {
			handleOverworldEvent(nextField.occupant.onClick);
		}
	}, [
		nextField.occupant,
		dispatch,
		handleOccupants,
		focusOccupant,
		handleOverworldEvent,
	]);

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
