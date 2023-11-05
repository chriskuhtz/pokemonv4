import { useCallback, useMemo, useState } from 'react';
import { moveOccupants } from '../functions/moveOccupants';
import {
	Direction,
	Occupant,
	OverworldMap,
	Tile,
} from '../interfaces/Overworld';
import { mockMap } from '../mockMap';
import { useAnimationFrame } from './useAnimationFrame';
import { useEncounter } from './useEncounter';
import { useHandleKeyPress } from './useHandleKeyPress';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';
import { useTurnTowardsPlayerOnInteraction } from './useTurnTowardsPlayerOnInteraction';
import { useWatchedFields } from './useWatchedFields';

const fps = 15;

export const useOverworld = () => {
	const [currentWorld] = useState<OverworldMap>(mockMap);
	const [occupants, setOccupants] = useState<Occupant[]>([
		...mockMap.occupants,
	]);

	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [orientation, setOrientation] = useState<Direction>('Up');
	const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);
	const [nextInput, setNextInput] = useState<
		React.KeyboardEvent<HTMLDivElement>['key'] | undefined
	>();
	const [movementPaused, setMovementPaused] = useState<boolean>(false);

	const nextField = useNextField(
		orientation,
		offsetX,
		offsetY,
		currentWorld,
		occupants
	);
	const watchedFields = useWatchedFields(occupants);
	const currentField = useMemo((): Tile => {
		if (
			watchedFields.some(
				(w) => w.position.x === offsetX && w.position.y === offsetY
			)
		) {
			setMovementPaused(true);
			console.log('yaya');
		}
		return currentWorld.map[offsetY][offsetX];
	}, [currentWorld.map, offsetX, offsetY, watchedFields]);

	useEncounter(currentWorld, setCurrentDialogue, currentField);
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
		setCurrentDialogue,
		nextField,
		orientation,
		setOrientation,
		handleMovement,
		movementPaused
	);

	const update = useCallback(() => {
		if (nextInput) {
			handleKeyPress(nextInput);
		}
		if (currentDialogue.length === 0 && !movementPaused) {
			setOccupants(moveOccupants(occupants, { x: offsetX, y: offsetY }));
		}

		setNextInput(undefined);
	}, [
		currentDialogue.length,
		handleKeyPress,
		nextInput,
		occupants,
		offsetX,
		offsetY,
		movementPaused,
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
		setCurrentDialogue,
		occupants,
		watchedFields,
	};
};
