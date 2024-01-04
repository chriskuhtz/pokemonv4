import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import { useGetOverworldMapQuery } from '../../../api/mapApi';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { ForwardFoot } from '../../../interfaces/ForwardFoot';
import { moveOccupants } from '../functions/moveOccupants';
import { OverworldMap } from '../interfaces/Overworld';
import { PortalEvent } from '../interfaces/OverworldEvent';
import { mockMap } from '../mockMap';
import { useAnimationFrame } from './useAnimationFrame';
import { useCurrentDialogue } from './useCurrentDialogue';
import { useCurrentField } from './useCurrentField';
import { useEncounter } from './useEncounter';
import { useHandleKeyPress } from './useHandleKeyPress';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';
import { useOccupants } from './useOccupants';
import { useOnPortalStep } from './useOnPortalStep';
import { useOnSaveFileLoad } from './useOnSaveFileLoad';
import { useSaveGame } from './useSaveGame';
import { useTurnTowardsPlayerOnInteraction } from './useTurnTowardsPlayerOnInteraction';
import { useWatchedFields } from './useWatchedFields';

const fps = 15;

export const useOverworld = () => {
	const username = getUserName();
	const {
		data: saveFile,
		isError: saveFileError,
		isFetching: isSaveFileFetching,
	} = useGetSaveFileQuery(username ?? skipToken);

	const {
		data: rawMap,
		isError: mapError,
		isFetching: isMapFetching,
	} = useGetOverworldMapQuery(saveFile?.currentMapId ?? skipToken);
	const [currentWorld, setCurrentWorld] = useState<OverworldMap>(mockMap);

	useEffect(() => {
		if (rawMap && currentWorld.id !== rawMap.id) {
			setCurrentWorld(rawMap);
		}
	}, [currentWorld, rawMap]);

	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [forwardFoot, setForwardFoot] = useState<ForwardFoot>('center1');
	const toggleForwardFoot = useCallback(() => {
		console.log('toggleFoot');
		if (forwardFoot === 'center1') {
			setForwardFoot('right');
			return;
		}
		if (forwardFoot === 'right') {
			setForwardFoot('center2');
			return;
		}
		if (forwardFoot === 'center2') {
			setForwardFoot('left');
			return;
		}
		if (forwardFoot === 'left') {
			setForwardFoot('center1');
			return;
		}
	}, [forwardFoot]);

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
		initiateMerchantDialogue,
		initiateHealerDialogue,
	} = useCurrentDialogue(focusedOccupant);

	useOnSaveFileLoad(
		setOffsetX,
		setOffsetY,
		setOrientation,
		handleOccupants,
		currentWorld,
		saveFile
	);
	const saveGame = useSaveGame();

	const saveCurrentGameState = useCallback(
		(heal?: boolean) => {
			saveGame(
				currentWorld.id,
				{ [`${currentWorld.id}`]: handledOccupantIds },
				offsetX,
				offsetY,
				orientation,
				collectedItems,
				heal
			);
		},
		[
			collectedItems,
			currentWorld.id,
			handledOccupantIds,
			offsetX,
			offsetY,
			orientation,
			saveGame,
		]
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

	const handlePortalEvent = useCallback(
		async (portalEvent: PortalEvent) => {
			await saveGame(
				portalEvent.mapId,
				{ [`${currentWorld.id}`]: handledOccupantIds },
				portalEvent.x,
				portalEvent.y,
				portalEvent.orientation,
				collectedItems
			);

			// await save current map, then save new map
		},
		[collectedItems, currentWorld, handledOccupantIds, saveGame]
	);
	useOnPortalStep(currentField, handlePortalEvent);
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
		offsetY,
		() => toggleForwardFoot()
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
		initiateMerchantDialogue,
		initiateHealerDialogue,
		continueDialogue,
		() => saveCurrentGameState(true)
	);

	const update = useCallback(() => {
		if (nextInput) {
			handleKeyPress(nextInput);
		}
		if (!nextInput) {
			setForwardFoot('center1');
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
		saveGame: saveCurrentGameState,
		saveFile,
		isFetching: isMapFetching || isSaveFileFetching,
		isError: saveFileError || mapError || !username,
		forwardFoot,
	};
};
