import { useMemo } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { getNewCoordinates } from '../functions/getNewCoordinates';
import {
	Occupant,
	OverworldMap,
	Position,
	Tile,
} from '../interfaces/Overworld';

export interface NextFieldInfo {
	tile?: Tile;
	occupant?: Occupant;
}

export const useNextField = (
	orientation: Direction,
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap,
	occupants: Occupant[]
) => {
	const nextCoordinates = useMemo(
		(): Position | undefined =>
			getNewCoordinates(orientation, offsetX, offsetY, currentWorld),
		[currentWorld, offsetX, offsetY, orientation]
	);
	return useMemo((): NextFieldInfo => {
		if (nextCoordinates) {
			const occupant = occupants.find(
				(o) =>
					o.position.x === nextCoordinates.x &&
					o.position.y === nextCoordinates.y
			);

			return {
				tile: currentWorld.map[nextCoordinates.y][nextCoordinates.x],
				occupant: occupant,
			};
		}
		return {};
	}, [currentWorld, nextCoordinates, occupants]);
};
