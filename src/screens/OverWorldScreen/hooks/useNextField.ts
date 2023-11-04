import { useMemo } from 'react';
import { Direction, OverworldMap, Tile } from '../interfaces/Overworld';

export const useNextField = (
	orientation: Direction,
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap
) => {
	return useMemo((): Tile | undefined => {
		if (orientation === 'up' && offsetY > 0) {
			return currentWorld.map[offsetY - 1][offsetX];
		}
		if (orientation === 'down' && offsetY < currentWorld.map.length - 1) {
			return currentWorld.map[offsetY + 1][offsetX];
		}
		if (orientation === 'left' && offsetX > 0) {
			return currentWorld.map[offsetY][offsetX - 1];
		}
		if (orientation === 'right' && offsetY < currentWorld.map[0].length - 1) {
			return currentWorld.map[offsetY][offsetX + 1];
		}
		return;
	}, [currentWorld, offsetX, offsetY, orientation]);
};
