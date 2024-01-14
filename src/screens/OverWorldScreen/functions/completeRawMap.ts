import { UniqueOccupantRecord } from '../../../constants/UniqueOccupantRecord';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Occupant } from '../interfaces/Occupants/Occupant';
import { OverworldMap } from '../interfaces/Overworld';
import { createBlockersForLargeObstacles } from './createBlockersForLargeObstacles';
import { getBaseTileIndex } from './getBaseTileIndex';

export const filterOccupantsByQuestStatus = (
	occupants: Occupant[],
	quests: SaveFile['quests']
): Occupant[] => {
	return occupants.filter((o) => {
		if (!o.questCondition) {
			//Occupant has no quest condition, always display
			return true;
		}
		if (o.questCondition) {
			return quests[o.questCondition.id] === o.questCondition.status;
		}
		return false;
	});
};
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
	console.log(updatedOccupants);

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
