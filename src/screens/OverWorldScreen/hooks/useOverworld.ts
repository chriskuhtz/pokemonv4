import { useCallback, useMemo, useState } from 'react';

import {
	Direction,
	Occupant,
	OverworldMap,
	Tile,
} from '../interfaces/Overworld';
import { mockMap } from '../mockMap';
import { useAnimationFrame } from './useAnimationFrame';
import { useEncounter } from './useEncounter';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';

const fps = 15;
const chanceToRotate = 0.95;

export const nextDirection = (direction: Direction) => {
	if (direction === 'Up') return 'Right';
	if (direction === 'Right') return 'Down';
	if (direction === 'Down') return 'Left';
	return 'Up';
};
export const rotateOccupants = (occupants: Occupant[]): Occupant[] =>
	occupants.map((o) => {
		const random = Math.random();
		if (!o.rotating || random < chanceToRotate) {
			return o;
		}

		return { ...o, orientation: nextDirection(o.orientation) };
	});

export const useOverworld = () => {
	const [currentWorld] = useState<OverworldMap>(mockMap);
	const [occupants, setOccupants] = useState<Occupant[]>(mockMap.occupants);
	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [orientation, setOrientation] = useState<Direction>('Up');
	const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);
	const [nextInput, setNextInput] = useState<
		React.KeyboardEvent<HTMLDivElement>['key'] | undefined
	>();

	const nextField = useNextField(
		orientation,
		offsetX,
		offsetY,
		currentWorld,
		currentWorld.occupants
	);

	const currentField = useMemo((): Tile => {
		return currentWorld.map[offsetY][offsetX];
	}, [currentWorld.map, offsetX, offsetY]);

	useEncounter(currentWorld, setCurrentDialogue, currentField);
	const handleMovement = useHandleMovement(
		setOffsetX,
		setOffsetY,
		offsetX,
		offsetY
	);

	const handleKeyPress = useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			//handle dialogue

			if (currentDialogue.length > 0) {
				if (key === ' ' || key === 'Enter') {
					setCurrentDialogue([...currentDialogue.slice(1)]);
				}
				return;
			}

			//handle click
			if (key === ' ' || key === 'Enter') {
				if (nextField.occupant && currentDialogue.length === 0) {
					setCurrentDialogue(nextField.occupant.dialogue);
					return;
				}
			}
			//handle orientation
			if ((key === 'w' || key === 'ArrowUp') && orientation !== 'Up') {
				setOrientation('Up');
				return;
			}
			if ((key === 's' || key === 'ArrowDown') && orientation !== 'Down') {
				setOrientation('Down');
				return;
			}
			if ((key === 'd' || key === 'ArrowRight') && orientation !== 'Right') {
				setOrientation('Right');
				return;
			}
			if ((key === 'a' || key === 'ArrowLeft') && orientation !== 'Left') {
				setOrientation('Left');
				return;
			}
			if (nextField.occupant || !nextField.tile) {
				return;
			}
			//handle movement
			handleMovement(key);
		},
		[currentDialogue, handleMovement, nextField, orientation]
	);

	const update = useCallback(() => {
		if (nextInput) {
			handleKeyPress(nextInput);
		}
		setOccupants(rotateOccupants(occupants));
		setNextInput(undefined);
	}, [handleKeyPress, nextInput, occupants]);

	useAnimationFrame(update, fps);

	const tryToSetNextInput = useCallback(
		(x: React.KeyboardEvent<HTMLDivElement>) => {
			if (!nextInput) {
				setNextInput(x.key);
			}
		},
		[nextInput]
	);

	return {
		currentWorld,
		tryToSetNextInput,
		offsetX,
		offsetY,
		orientation,
		currentDialogue,
		setCurrentDialogue,
		occupants,
	};
};
