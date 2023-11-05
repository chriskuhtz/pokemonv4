import { Direction, Occupant, Position } from '../interfaces/Overworld';
import { nextDirection } from './nextDirection';

const chanceToMove = 0.95;

const getDirection = (from: Position, to: Position): Direction => {
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

export const moveOccupants = (occupants: Occupant[]): Occupant[] =>
	occupants.map((o) => {
		const random = Math.random();
		if (!o.movement || random < chanceToMove) {
			return o;
		}
		if (o.movement.type === 'ROTATING') {
			return { ...o, orientation: nextDirection(o.orientation) };
		}

		if (o.movement.type === 'PATHING') {
			const updatedO = { ...o };

			const nextIndex =
				o.movement.index === o.movement.path.length - 1
					? 0
					: o.movement.index + 1;

			const goalPosition = o.movement.path[o.movement.index];
			const correctDirection = getDirection(o.position, goalPosition);

			if (updatedO.orientation === correctDirection && updatedO.movement) {
				return {
					...updatedO,
					position: goalPosition,
					movement: { ...updatedO.movement, index: nextIndex },
				};
			}
			if (updatedO.orientation !== correctDirection && updatedO.movement) {
				return {
					...updatedO,
					orientation: correctDirection,
				};
			}
			return updatedO;
		}

		return o;
	});
