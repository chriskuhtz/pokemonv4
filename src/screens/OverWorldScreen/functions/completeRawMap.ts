import { OverworldMap } from '../interfaces/Overworld';
import { createBlockersForLargeObstacles } from './createBlockersForLargeObstacles';
import { getBaseTileIndex } from './getBaseTileIndex';

export const completeRawMap = (rawMap: OverworldMap): OverworldMap => {
	let updatedMap = { ...rawMap };
	const updatedOccupants = createBlockersForLargeObstacles(
		updatedMap.occupants
	);

	const updatedTiles: OverworldMap['map'] = updatedMap.map.map((row) => {
		return row.map((t) => {
			return { ...t, baseTileIndex: getBaseTileIndex(updatedMap.baseTile) };
		});
	});
	//remove/add occupants based on conditions

	updatedMap = {
		...updatedMap,
		occupants: updatedOccupants,
		map: updatedTiles,
	};

	return updatedMap;
};
