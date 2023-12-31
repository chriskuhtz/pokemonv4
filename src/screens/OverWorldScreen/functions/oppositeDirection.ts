import { Direction } from '../../../interfaces/Direction';

export const oppositeDirection = (direction: Direction): Direction => {
	if (direction === 'Up') return 'Down';
	if (direction === 'Right') return 'Left';
	if (direction === 'Down') return 'Up';
	return 'Right';
};
