import { useCallback, useState } from 'react';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { moveOccupants } from '../functions/moveOccupants';
import { OverworldMap } from '../interfaces/Overworld';
import { mockMap } from '../mockMap';
import { useAnimationFrame } from './useAnimationFrame';
import { useCurrentDialogue } from './useCurrentDialogue';
import { useCurrentField } from './useCurrentField';
import { useEncounter } from './useEncounter';
import { useHandleKeyPress } from './useHandleKeyPress';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';
import { useOccupants } from './useOccupants';
import { useOnSaveFileLoad } from './useOnSaveFileLoad';
import { useSaveGame } from './useSaveGame';
import { useTurnTowardsPlayerOnInteraction } from './useTurnTowardsPlayerOnInteraction';
import { useWatchedFields } from './useWatchedFields';

const fps = 15;

export const useOverworld = () => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? '');

	const [currentWorld] = useState<OverworldMap>(mockMap);

	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);

	const [orientation, setOrientation] = useState<Direction>('Up');

	const {
		occupants,
		focusOccupant,
		handleOccupants,
		setOccupants,
		focusedOccupant,
		handledOccupantIds,
		collectedItems,
	} = useOccupants(currentWorld);

	const {
		currentDialogue,
		initiateItemDialogue,
		continueDialogue,
		initiateEncounterDialogue,
	} = useCurrentDialogue(focusedOccupant);

	useOnSaveFileLoad(
		setOffsetX,
		setOffsetY,
		setOrientation,
		handleOccupants,
		currentWorld,
		saveFile
	);
	const saveGame = useSaveGame(
		currentWorld.id,
		handledOccupantIds,
		offsetX,
		offsetY,
		orientation,
		collectedItems
	);

	const [nextInput, setNextInput] = useState<
		React.KeyboardEvent<HTMLDivElement>['key'] | undefined
	>();

	const nextField = useNextField(
		orientation,
		offsetX,
		offsetY,
		currentWorld,
		occupants
	);
	const watchedFields = useWatchedFields(occupants);
	const currentField = useCurrentField(
		watchedFields,
		offsetX,
		offsetY,
		occupants,
		focusOccupant,
		currentWorld
	);

	useEncounter(currentWorld, initiateEncounterDialogue, currentField);

	useTurnTowardsPlayerOnInteraction(
		currentDialogue,
		nextField,
		occupants,
		setOccupants,
		orientation
	);

	const handleMovement = useHandleMovement(
		setOffsetX,
		setOffsetY,
		offsetX,
		offsetY
	);

	const handleKeyPress = useHandleKeyPress(
		currentDialogue,
		focusOccupant,
		nextField,
		orientation,
		setOrientation,
		handleMovement,
		focusedOccupant,
		handleOccupants,
		initiateItemDialogue,
		continueDialogue
	);

	const update = useCallback(() => {
		if (nextInput) {
			handleKeyPress(nextInput);
		}
		if (!focusedOccupant) {
			const { newOccupants, hasChanges } = moveOccupants(occupants, {
				x: offsetX,
				y: offsetY,
			});
			if (hasChanges) {
				setOccupants(newOccupants);
			}
		}

		setNextInput(undefined);
	}, [
		focusedOccupant,
		handleKeyPress,
		nextInput,
		occupants,
		offsetX,
		offsetY,
		setOccupants,
	]);

	const tryToSetNextInput = useCallback(
		(x: React.KeyboardEvent<HTMLDivElement>) => {
			if (!nextInput) {
				setNextInput(x.key);
			}
		},
		[nextInput]
	);

	useAnimationFrame(update, fps);

	return {
		currentWorld,
		tryToSetNextInput,
		offsetX,
		offsetY,
		orientation,
		currentDialogue,
		occupants,
		watchedFields,
		saveGame,
	};
};
