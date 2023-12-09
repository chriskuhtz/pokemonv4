import { useEffect, useState } from 'react';
import { Occupant } from '../interfaces/Overworld';

export const useFocusedOccupant = (
	setCurrentDialogue: (x: string[]) => void,
	setHandledTrainers: (x: string[]) => void,
	handledTrainers: string[]
) => {
	const [focusedOccupant, setFocusedOccupant] = useState<Occupant | undefined>(
		undefined
	);

	useEffect(() => {
		if (focusedOccupant) {
			setCurrentDialogue(focusedOccupant?.dialogue);
			if (!handledTrainers.some((h) => focusedOccupant.id === h)) {
				setHandledTrainers([...handledTrainers, focusedOccupant.id]);
			}
		}
	}, [
		focusedOccupant,
		handledTrainers,
		setCurrentDialogue,
		setHandledTrainers,
	]);
	return { focusedOccupant, setFocusedOccupant };
};
