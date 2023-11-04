import { useMemo } from 'react';
import {
	Direction,
	Occupant,
	OverworldMap,
	Position,
	Tile,
} from '../interfaces/Overworld';

export const useNextField = (
	orientation: Direction,
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap,
	occupants: Occupant[]
) => {
	const nextCoordinates = useMemo((): Position | undefined => {
		if (orientation === 'Up' && offsetY > 0) {
			return { y: offsetY - 1, x: offsetX };
		}
		if (orientation === 'Down' && offsetY < currentWorld.map.length - 1) {
			return { y: offsetY + 1, x: offsetX };
		}
		if (orientation === 'Left' && offsetX > 0) {
			return { y: offsetY, x: offsetX - 1 };
		}
		if (orientation === 'Right' && offsetX < currentWorld.map[0].length - 1) {
			return { y: offsetY, x: offsetX + 1 };
		}
	}, [currentWorld, offsetX, offsetY, orientation]);
	return useMemo((): Tile | undefined => {
		if (nextCoordinates) {
			const occupant = occupants.find(
				(o) =>
					o.position.x === nextCoordinates.x &&
					o.position.y === nextCoordinates.y
			);

			return occupant
				? undefined
				: currentWorld.map[nextCoordinates.y][nextCoordinates.x];
		}
	}, [currentWorld, nextCoordinates, occupants]);
};
