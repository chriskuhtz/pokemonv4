import { UniqueOccupantRecord } from '../../../constants/UniqueOccupantRecord';
import { filterOccupantsByQuestStatus } from '../../../functions/filterOccupantsByQuestStatus';
import { SaveFile } from '../../../interfaces/SaveFile';
import { OverworldMap } from '../interfaces/Overworld';
import { createBlockersForLargeObstacles } from './createBlockersForLargeObstacles';
import { getBaseTileIndex } from './getBaseTileIndex';

export const completeRawMap = (
	rawMap: OverworldMap,
	saveFile: SaveFile
): OverworldMap => {
	let updatedMap = { ...rawMap };

	let updatedOccupants = filterOccupantsByQuestStatus(
		Object.values(UniqueOccupantRecord).filter(
			(occ) => occ.position.currentMapId === rawMap.id
		),
		saveFile.quests
	);
	updatedOccupants = createBlockersForLargeObstacles(updatedOccupants);
	console.log(
		Object.values(UniqueOccupantRecord).filter(
			(occ) => occ.position.currentMapId === rawMap.id
		),
		updatedOccupants
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
