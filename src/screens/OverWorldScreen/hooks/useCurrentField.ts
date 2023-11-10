import { useMemo } from 'react';
import {
	Occupant,
	OverworldMap,
	Tile,
	WatchedField,
} from '../interfaces/Overworld';

export const useCurrentField = (
	watchedFields: WatchedField[],
	offsetX: number,
	offsetY: number,
	occupants: Occupant[],
	setFocusedOccupant: (x: Occupant) => void,
	currentWorld: OverworldMap
) => {
	return useMemo((): Tile => {
		const watcherId = watchedFields.find(
			(w) => w.position.x === offsetX && w.position.y === offsetY
		)?.watcherId;
		const watcher = occupants.find((o) => o.id === watcherId);
		if (watcher) {
			setFocusedOccupant(watcher);
		}
		return currentWorld.map[offsetY][offsetX];
	}, [
		currentWorld.map,
		occupants,
		offsetX,
		offsetY,
		setFocusedOccupant,
		watchedFields,
	]);
};
