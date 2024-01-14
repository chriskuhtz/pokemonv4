import { Occupant } from '../interfaces/Occupants/Occupant';
import { Position } from '../interfaces/Position';
import { getDirection } from './getDirection';
import { nextDirection } from './nextDirection';

const chanceToMove = 0.95;

export const moveOccupants = (
	occupants: Occupant[],
	playerPosition: Position
): { newOccupants: Occupant[]; hasChanges: boolean } => {
	let hasChanges = false;
	const newOccupants = occupants.map((o) => {
		const random = Math.random();
		if (o.type !== 'NPC' || !o.movement || random < chanceToMove) {
			return o;
		}
		hasChanges = true;
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

			if (updatedO.orientation !== correctDirection && updatedO.movement) {
				return {
					...updatedO,
					orientation: correctDirection,
				};
			}

			const occupiedPositions: Position[] = [
				...occupants.filter((o) => o.id !== updatedO.id).map((o) => o.position),
				playerPosition,
			];

			if (
				occupiedPositions.some(
					(p) => p.x === goalPosition.x && p.y === goalPosition.y
				)
			) {
				return updatedO;
			}

			if (updatedO.orientation === correctDirection && updatedO.movement) {
				return {
					...updatedO,
					position: goalPosition,
					movement: { ...updatedO.movement, index: nextIndex },
				};
			}

			return updatedO;
		}

		return o;
	});

	return { newOccupants, hasChanges };
};
