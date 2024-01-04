import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { RoutesEnum } from '../../../router/router';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import {
	isHealer,
	isMerchant,
	isNpc,
	isOverworldItem,
} from '../functions/isNpc';
import {
	Merchant,
	Occupant,
	OverworldItem,
	QuestCheck,
} from '../interfaces/Occupant';
import { NextFieldInfo } from './useNextField';

export const useIsQuestCompleted = () => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? skipToken);

	return useCallback(
		(x: QuestCheck) => {
			if (!saveFile) {
				return false;
			}
			console.log(x, saveFile.quests);
			if (
				!saveFile.quests.some(
					(q) => q.id === x.questId && q.status === 'completed'
				)
			) {
				return false;
			}
			return true;
		},
		[saveFile]
	);
};

export const useHandleKeyPress = (
	currentDialogue: string[],
	focusOccupant: (id: string) => void,
	nextField: NextFieldInfo,
	orientation: Direction,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void,
	focusedOccupant: Occupant | undefined,
	handleOccupants: (x: string[]) => void,
	initiateItemDialogue: (x: OverworldItem) => void,
	initiateMerchantDialogue: (x: Merchant) => void,
	initiateHealerDialogue: () => void,
	continueDialogue: () => void,
	healTeam: () => void
) => {
	const isQuestCompleted = useIsQuestCompleted();
	const navigate = useNavigate();
	const openMarketScreen = useCallback(
		(x: Merchant) => {
			navigate(RoutesEnum.market, { state: x.inventory });
		},
		[navigate]
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
				continueDialogue();
			}
		},
		[
			currentDialogue.length,
			continueDialogue,
			focusedOccupant,
			handleOccupants,
			openMarketScreen,
			healTeam,
		]
	);

	const handleEnterAndSpace = useCallback(() => {
		if (isOverworldItem(nextField.occupant) && !nextField.occupant.handled) {
			initiateItemDialogue(nextField.occupant);
			handleOccupants([nextField.occupant.id]);
			return;
		}
		if (isNpc(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			return;
		}
		if (isMerchant(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			initiateMerchantDialogue(nextField.occupant);
			return;
		}
		if (isHealer(nextField.occupant)) {
			focusOccupant(nextField.occupant.id);
			initiateHealerDialogue();
			return;
		}
	}, [
		nextField.occupant,
		initiateItemDialogue,
		handleOccupants,
		focusOccupant,
		initiateMerchantDialogue,
		initiateHealerDialogue,
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
