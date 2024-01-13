import { Direction } from '../../../interfaces/Direction';
import { Position } from '../interfaces/Position';

export const getDirection = (from: Position, to: Position): Direction => {
	if (to.x > from.x) {
		return 'Right';
	}
	if (to.x < from.x) {
		return 'Left';
	}

	if (to.y > from.y) {
		return 'Down';
	}

	return 'Up';
};
