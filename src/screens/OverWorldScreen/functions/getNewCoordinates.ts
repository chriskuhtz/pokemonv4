import { Direction } from '../../../interfaces/Direction';
import { OverworldMap } from '../interfaces/Overworld';
import { Position } from '../interfaces/Position';

export const getNewCoordinates = (
	orientation: Direction,
	offsetX: number,
	offsetY: number,
	currentWorld: OverworldMap
): Position | undefined => {
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
};
