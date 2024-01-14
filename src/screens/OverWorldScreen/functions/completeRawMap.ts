import { OverworldMap } from '../interfaces/Overworld';
import { Position } from '../interfaces/Position';
import { isLargeObstacle } from './OccupantTypeGuards';

export const completeRawMap = (rawMap: OverworldMap): OverworldMap => {
	let updatedMap = { ...rawMap };
	const updatedOccupants = [...updatedMap.occupants];
	//assign baseTile indexes
	//remove/add occupants based on conditions
	//add interactive invi blockers for large obstacles in y direction
	const largeObstacles = rawMap.occupants.filter(isLargeObstacle);

	largeObstacles.forEach((largeObstacle) => {
		const positionsArray: Position[] = [];

		let i = largeObstacle.position.y;

		while (i > largeObstacle.position.y - largeObstacle.height) {
			let j = largeObstacle.position.x;
			while (j < largeObstacle.position.x + largeObstacle.width) {
				//Do nothing for the actual position of the obstacle
				if (
					!(i === largeObstacle.position.y && j === largeObstacle.position.x)
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
				position: p,
			})
		);
	});
	console.log(rawMap, largeObstacles);
	updatedMap = { ...updatedMap, occupants: updatedOccupants };
	console.log(updatedMap);
	return updatedMap;
};
