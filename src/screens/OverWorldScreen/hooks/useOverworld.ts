import { useCallback, useMemo, useState } from 'react';

import { Direction, OverworldMap, Tile } from '../interfaces/Overworld';
import { mockMap } from '../mockMap';
import { useEncounter } from './useEncounter';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';

export const useOverworld = () => {
	const [currentWorld] = useState<OverworldMap>(mockMap);
	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [orientation, setOrientation] = useState<Direction>('Up');
	const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);

	const nextField = useNextField(orientation, offsetX, offsetY, currentWorld);
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
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			//handle dialogue
			if (currentDialogue.length > 0) {
				if (e.key === ' ' || e.key === 'Enter') {
					setCurrentDialogue([...currentDialogue.slice(1)]);
				}

				return;
			}

			//handle click
			if (e.key === ' ' || e.key === 'Enter') {
				if (
					nextField?.onClick?.type === 'DIALOGUE' &&
					currentDialogue.length === 0
				) {
					const dialogue = currentWorld.dialogues[nextField.onClick.id];
					setCurrentDialogue(dialogue.passages);
					return;
				}
			}
			//handle orientation
			if ((e.key === 'w' || e.key === 'ArrowUp') && orientation !== 'Up') {
				setOrientation('Up');
				return;
			}
			if ((e.key === 's' || e.key === 'ArrowDown') && orientation !== 'Down') {
				setOrientation('Down');
				return;
			}
			if (
				(e.key === 'd' || e.key === 'ArrowRight') &&
				orientation !== 'Right'
			) {
				setOrientation('Right');
				return;
			}
			if ((e.key === 'a' || e.key === 'ArrowLeft') && orientation !== 'Left') {
				setOrientation('Left');
				return;
			}
			if (!nextField || !nextField.passable) {
				return;
			}

			handleMovement(e);
			//handle movement
		},
		[currentDialogue, currentWorld, handleMovement, nextField, orientation]
	);

	return {
		currentWorld,
		handleKeyPress,
		offsetX,
		offsetY,
		orientation,
		currentDialogue,
		setCurrentDialogue,
	};
};
