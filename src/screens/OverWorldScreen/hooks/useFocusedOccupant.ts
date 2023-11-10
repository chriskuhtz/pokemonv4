import { useEffect, useState } from 'react';
import { Occupant } from '../interfaces/Overworld';

export const useFocusedOccupant = (
	setCurrentDialogue: (x: string[]) => void
) => {
	const [focusedOccupant, setFocusedOccupant] = useState<Occupant | undefined>(
		undefined
	);

	useEffect(() => {
		if (focusedOccupant) {
			setCurrentDialogue(focusedOccupant?.dialogue);
		}
	}, [focusedOccupant, setCurrentDialogue]);
	return { focusedOccupant, setFocusedOccupant };
};
