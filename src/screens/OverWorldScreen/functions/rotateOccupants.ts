import { Occupant } from '../interfaces/Overworld';
import { nextDirection } from './nextDirection';

const chanceToRotate = 0.95;

export const rotateOccupants = (occupants: Occupant[]): Occupant[] =>
	occupants.map((o) => {
		const random = Math.random();
		if (!o.rotating || random < chanceToRotate) {
			return o;
		}

		return { ...o, orientation: nextDirection(o.orientation) };
	});
