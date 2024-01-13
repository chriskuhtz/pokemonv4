import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../api/store';
import { focusOccupant, selectOccupants } from '../../../slices/occupantsSlice';
import { OverworldMap, Tile } from '../interfaces/Overworld';
import { WatchedField } from '../interfaces/WatchedField';

export const useCurrentField = (
	watchedFields: WatchedField[],
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap
) => {
	const occupants = useSelector(selectOccupants);
	const dispatch = useAppDispatch();

	return useMemo((): Tile => {
		const watcherId = watchedFields.find(
			(w) => w.position.x === offsetX && w.position.y === offsetY
		)?.watcherId;
		const watcher = occupants.find((o) => o.id === watcherId);
		if (watcher) {
			dispatch(focusOccupant(watcher.id));
		}
		return currentWorld.map[offsetY][offsetX];
	}, [currentWorld.map, dispatch, occupants, offsetX, offsetY, watchedFields]);
};
