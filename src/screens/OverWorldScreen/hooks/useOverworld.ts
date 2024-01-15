import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetOverworldMapQuery } from '../../../api/mapApi';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { useAppDispatch } from '../../../api/store';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { ForwardFoot } from '../../../interfaces/ForwardFoot';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import {
	selectFocusedOccupant,
	selectOccupants,
	setOccupants,
} from '../../../slices/occupantsSlice';
import {
	completeRawMap,
	updateOccupantsOnChange,
} from '../functions/completeRawMap';
import { moveOccupants } from '../functions/moveOccupants';
import { OverworldMap } from '../interfaces/Overworld';
import { mockMap } from '../mockMap';
import { useAnimationFrame } from './useAnimationFrame';
import { useCurrentField } from './useCurrentField';
import { useEncounter } from './useEncounter';
import { useHandleKeyPress } from './useHandleKeyPress';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';
import { useOnPortalStep } from './useOnPortalStep';
import { useOnSaveFileLoad } from './useOnSaveFileLoad';
import { useTurnTowardsPlayerOnInteraction } from './useTurnTowardsPlayerOnInteraction';

const fps = 15;

export const useOverworld = () => {
	const dispatch = useAppDispatch();
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
	} = useGetOverworldMapQuery(
		saveFile?.overworldPosition.currentMapId ?? skipToken
	);
	const [currentWorld, setCurrentWorld] = useState<OverworldMap>(mockMap);

	useEffect(() => {
		if (saveFile && rawMap && currentWorld.id !== rawMap.id) {
			const completeMap = completeRawMap(rawMap, saveFile);
			dispatch(setOccupants(completeMap.occupants ?? []));
			setCurrentWorld(completeMap);
		}
	}, [currentWorld, dispatch, rawMap, saveFile]);

	useEffect(() => {
		if (saveFile) {
			dispatch(
				setOccupants(
					updateOccupantsOnChange(
						rawMap?.occupants ?? [],
						saveFile.overworldPosition.currentMapId,
						saveFile.quests
					)
				)
			);
		}
	}, [dispatch, rawMap, saveFile]);

	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [forwardFoot, setForwardFoot] = useState<ForwardFoot>('center1');
	const [orientation, setOrientation] = useState<Direction>('Up');

	const currentPosition: OverworldPosition = useMemo(() => {
		return {
			orientation: orientation,
			position: { x: offsetX, y: offsetY },
			currentMapId: currentWorld.id,
		};
	}, [currentWorld.id, offsetX, offsetY, orientation]);

	const toggleForwardFoot = useCallback(() => {
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

	useOnSaveFileLoad(
		setOffsetX,
		setOffsetY,
		setOrientation,
		currentWorld,
		saveFile
	);

	const [nextInput, setNextInput] = useState<
		React.KeyboardEvent<HTMLDivElement>['key'] | undefined
	>();

	const nextField = useNextField(orientation, offsetX, offsetY, currentWorld);

	const currentField = useCurrentField(offsetX, offsetY, currentWorld);

	useOnPortalStep(currentField, currentPosition);
	useEncounter(currentWorld, currentField);

	useTurnTowardsPlayerOnInteraction(nextField, orientation);

	const handleMovement = useHandleMovement(
		setOffsetX,
		setOffsetY,
		offsetX,
		offsetY,
		() => toggleForwardFoot()
	);

	const handleKeyPress = useHandleKeyPress(
		nextField,
		currentPosition,
		setOrientation,
		handleMovement
	);

	const focusedOccupant = useSelector(selectFocusedOccupant);
	const occupants = useSelector(selectOccupants);

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
				dispatch(setOccupants(newOccupants));
			}
		}

		setNextInput(undefined);
	}, [
		dispatch,
		focusedOccupant,
		handleKeyPress,
		nextInput,
		occupants,
		offsetX,
		offsetY,
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
		saveFile,
		isFetching: isMapFetching || isSaveFileFetching,
		isError: saveFileError || mapError || !username,
		forwardFoot,
		currentPosition,
	};
};
