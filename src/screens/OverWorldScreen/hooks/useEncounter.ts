import { useCallback, useEffect, useState } from 'react';
import { OverworldMap, Tile } from '../interfaces/Overworld';

const baseEncounterChance: number = 0.2;
const increaseFactor: number = 1.05;

export const useEncounter = (
	currentWorld: OverworldMap,
	initiateEncounterDialogue: (x: string) => void,

	currentField: Tile
) => {
	const [encounterChance, setEncounterChance] =
		useState<number>(baseEncounterChance);

	const handleEncounter = useCallback(() => {
		const randomIndex = Math.floor(
			Math.random() * currentWorld.encounters.length
		);
		const randomEncounter = currentWorld.encounters[randomIndex];

		initiateEncounterDialogue(randomEncounter);
	}, [currentWorld.encounters, initiateEncounterDialogue]);
	useEffect(
		() => {
			if (currentField.onStep?.type === 'ENCOUNTER') {
				const random = Math.random();
				if (random < encounterChance) {
					handleEncounter();
					setEncounterChance(baseEncounterChance);
				} else {
					setEncounterChance(encounterChance * increaseFactor);
				}
			}
		},
		// encouterChance is missing on purpose
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentField, handleEncounter]
	);
};
