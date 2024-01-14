import { Occupant } from '../interfaces/Occupants/Occupant';
import { Position } from '../interfaces/Position';
import { isLargeObstacle } from './OccupantTypeGuards';

export const createBlockersForLargeObstacles = (
	occupants: Occupant[]
): Occupant[] => {
	const updatedOccupants = [...occupants];
	const largeObstacles = occupants.filter(isLargeObstacle);

	largeObstacles.forEach((largeObstacle) => {
		const positionsArray: Position[] = [];

		let i = largeObstacle.position.position.y;

		while (
			i >
			largeObstacle.position.position.y -
				(largeObstacle.height - (largeObstacle.clearanceBehind ?? 0))
		) {
			let j = largeObstacle.position.position.x;
			while (j < largeObstacle.position.position.x + largeObstacle.width) {
				//Do nothing for the actual position of the obstacle
				if (
					!(
						i === largeObstacle.position.position.y &&
						j === largeObstacle.position.position.x
					)
				) {
					positionsArray.push({ y: i, x: j });
				}
				j++;
			}

			i--;
		}

		positionsArray.forEach((p) =>
			updatedOccupants.push({
				type: 'INVISIBLE_BLOCKER',
				id: largeObstacle.id,
				onClick: largeObstacle.onClick,
				position: {
					position: p,
					orientation: 'Down',
					currentMapId: occupants[0].position.currentMapId,
				},
			})
		);
	});

	return updatedOccupants;
};
