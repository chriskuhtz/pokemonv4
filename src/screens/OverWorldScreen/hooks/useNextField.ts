import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Direction } from '../../../interfaces/Direction';
import { selectOccupantByPosition } from '../../../slices/occupantsSlice';
import { getNewCoordinates } from '../functions/getNewCoordinates';
import { Occupant } from '../interfaces/Occupants/Occupant';
import { OverworldMap } from '../interfaces/Overworld';
import { Position } from '../interfaces/Position';
import { Tile } from '../interfaces/Tile';

export interface NextFieldInfo {
	tile?: Tile;
	occupant?: Occupant;
}

export const useNextField = (
	orientation: Direction,
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap
) => {
	const nextCoordinates = useMemo(
		(): Position | undefined =>
			getNewCoordinates(orientation, offsetX, offsetY, currentWorld),
		[currentWorld, offsetX, offsetY, orientation]
	);

	const occupant = useSelector((state) =>
		selectOccupantByPosition(state, {
			x: nextCoordinates?.x ?? -1,
			y: nextCoordinates?.y ?? -1,
		})
	);

	return useMemo((): NextFieldInfo => {
		if (nextCoordinates) {
			return {
				tile: currentWorld.map[nextCoordinates.y][nextCoordinates.x],
				occupant: occupant,
			};
		}
		return {};
	}, [currentWorld, nextCoordinates, occupant]);
};
