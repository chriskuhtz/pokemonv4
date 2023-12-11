import { useMemo } from 'react';
import { Occupant } from '../interfaces/Occupant';
import { OverworldMap, Tile } from '../interfaces/Overworld';
import { WatchedField } from '../interfaces/WatchedField';

export const useCurrentField = (
	watchedFields: WatchedField[],
	offsetX: number,
	offsetY: number,
	occupants: Occupant[],
	focusOccupant: (x: string) => void,
	currentWorld: OverworldMap
) => {
	return useMemo((): Tile => {
		const watcherId = watchedFields.find(
			(w) => w.position.x === offsetX && w.position.y === offsetY
		)?.watcherId;
		const watcher = occupants.find((o) => o.id === watcherId);
		if (watcher) {
			focusOccupant(watcher.id);
		}
		return currentWorld.map[offsetY][offsetX];
	}, [
		currentWorld.map,
		focusOccupant,
		occupants,
		offsetX,
		offsetY,
		watchedFields,
	]);
};
