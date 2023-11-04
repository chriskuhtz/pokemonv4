import { useCallback, useEffect, useState } from 'react';
import { OverworldMap, Tile } from '../interfaces/Overworld';

const baseEncounterChance: number = 0.2;
const increaseFactor: number = 1.05;

export const useEncounter = (
	currentWorld: OverworldMap,
	setCurrentDialogue: (x: string[]) => void,

	currentField: Tile
) => {
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterChance);

	const handleEncounter = useCallback(() => {
		const randomIndex = Math.floor(
			Math.random() * currentWorld.encounters.length
		);
		const randomEncounter = currentWorld.encounters[randomIndex];

		setCurrentDialogue([
			`a wild ${randomEncounter} jumped out of the high grass`,
		]);
	}, [currentWorld, setCurrentDialogue]);
	useEffect(() => {
		if (currentField.onStep?.type === 'ENCOUNTER') {
			const random = Math.random();
			if (random < encounterChance) {
				handleEncounter();
				setEncounterChance(baseEncounterChance);
			} else {
				setEncounterChance(encounterChance * increaseFactor);
			}
		}
	}, [currentField, handleEncounter]);
};
