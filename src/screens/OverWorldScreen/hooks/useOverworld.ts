import { useCallback, useEffect, useMemo, useState } from 'react';

import { Direction, OverworldMap, Tile } from '../interfaces/Overworld';
import { mockMap } from '../mockMap';

const baseEncounterChance: number = 0.2;

export const useOverworld = () => {
	const [currentWorld] = useState<OverworldMap>(mockMap);
	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [orientation, setOrientation] = useState<Direction>('up');
	const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterChance);

	const nextField = useMemo((): Tile | undefined => {
		if (orientation === 'up' && offsetY > 0) {
			return currentWorld.map[offsetY - 1][offsetX];
		}
		if (orientation === 'down' && offsetY < currentWorld.map.length - 1) {
			return currentWorld.map[offsetY + 1][offsetX];
		}
		if (orientation === 'left' && offsetX > 0) {
			return currentWorld.map[offsetY][offsetX - 1];
		}
		if (orientation === 'right' && offsetY < currentWorld.map[0].length - 1) {
			return currentWorld.map[offsetY][offsetX + 1];
		}
		return;
	}, [currentWorld, offsetX, offsetY, orientation]);
	const currentField = useMemo((): Tile => {
		return currentWorld.map[offsetY][offsetX];
	}, [currentWorld.map, offsetX, offsetY]);

	const handleEncounter = useCallback(() => {
		const randomIndex = Math.floor(
			Math.random() * currentWorld.encounters.length
		);
		const randomEncounter = currentWorld.encounters[randomIndex];
		console.log(currentWorld.encounters, randomEncounter, randomIndex);
		setCurrentDialogue([
			`a wild ${randomEncounter} jumped out of the high grass`,
		]);
	}, [currentWorld]);
	useEffect(() => {
		if (currentField.onStep?.type === 'ENCOUNTER') {
			const random = Math.random();
			console.log('effect', random, encounterChance);
			if (random < encounterChance) {
				handleEncounter();
				setEncounterChance(baseEncounterChance);
			} else {
				setEncounterChance(encounterChance + 0.05);
			}
		}
	}, [currentField, handleEncounter]);

	const handleMovement = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === 'w' || e.key === 'ArrowUp') {
				setOffsetY(offsetY - 1);
			}
			if (e.key === 's' || e.key === 'ArrowDown') {
				setOffsetY(offsetY + 1);
			}
			if (e.key === 'd' || e.key === 'ArrowRight') {
				setOffsetX(offsetX + 1);
			}
			if (e.key === 'a' || e.key === 'ArrowLeft') {
				setOffsetX(offsetX - 1);
			}
		},
		[offsetX, offsetY]
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
			if ((e.key === 'w' || e.key === 'ArrowUp') && orientation !== 'up') {
				setOrientation('up');
				return;
			}
			if ((e.key === 's' || e.key === 'ArrowDown') && orientation !== 'down') {
				setOrientation('down');
				return;
			}
			if (
				(e.key === 'd' || e.key === 'ArrowRight') &&
				orientation !== 'right'
			) {
				setOrientation('right');
				return;
			}
			if ((e.key === 'a' || e.key === 'ArrowLeft') && orientation !== 'left') {
				setOrientation('left');
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
