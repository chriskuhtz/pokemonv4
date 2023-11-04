import { Direction } from '../interfaces/Overworld';

export const nextDirection = (direction: Direction): Direction => {
	if (direction === 'Up') return 'Right';
	if (direction === 'Right') return 'Down';
	if (direction === 'Down') return 'Left';
	return 'Up';
};
