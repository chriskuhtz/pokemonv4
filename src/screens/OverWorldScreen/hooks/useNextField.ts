import { useMemo } from 'react';
import { Direction, OverworldMap, Tile } from '../interfaces/Overworld';

export const useNextField = (
	orientation: Direction,
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap
) => {
	return useMemo((): Tile | undefined => {
		if (orientation === 'Up' && offsetY > 0) {
			return currentWorld.map[offsetY - 1][offsetX];
		}
		if (orientation === 'Down' && offsetY < currentWorld.map.length - 1) {
			return currentWorld.map[offsetY + 1][offsetX];
		}
		if (orientation === 'Left' && offsetX > 0) {
			return currentWorld.map[offsetY][offsetX - 1];
		}
		if (orientation === 'Right' && offsetX < currentWorld.map[0].length - 1) {
			return currentWorld.map[offsetY][offsetX + 1];
		}
		return;
	}, [currentWorld, offsetX, offsetY, orientation]);
};
