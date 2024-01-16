import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHasUnclaimedQuests } from '../../../hooks/useHasUnclaimedQuests';
import { useIsQuestCompleted } from '../../../hooks/useIsQuestCompleted';
import { Direction } from '../../../interfaces/Direction';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { selectCurrentDialogue } from '../../../slices/dialogueSlice';
import { getNewOrientationAfterKeyPress } from '../functions/getNewOrientationAfterKeyPress';
import { isImpassableOccupant } from '../functions/isImpassableOccupant';
import { useHandleDialogue } from './useHandleDialogue';
import { useHandleEnterAndSpace } from './useHandleEnterAndSpace';
import { NextFieldInfo } from './useNextField';

export const useHandleKeyPress = (
	nextField: NextFieldInfo,
	currentPosition: OverworldPosition,
	setOrientation: (x: Direction) => void,
	handleMovement: (key: string) => void
) => {
	const currentDialogue = useSelector(selectCurrentDialogue);
	const isQuestCompleted = useIsQuestCompleted();
	const hasUnclaimedQuests = useHasUnclaimedQuests();

	const handleEnterAndSpace = useHandleEnterAndSpace(
		currentPosition,
		nextField.occupant
	);
	const handleDialogue = useHandleDialogue(currentPosition);

	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//quest modal blocks all keys
			if (hasUnclaimedQuests) {
				return;
			}
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
			currentDialogue.length,
			currentPosition.orientation,
			handleDialogue,
			handleEnterAndSpace,
			handleMovement,
			hasUnclaimedQuests,
			isQuestCompleted,
			nextField?.occupant,
			nextField.tile,
			setOrientation,
		]
	);
};
