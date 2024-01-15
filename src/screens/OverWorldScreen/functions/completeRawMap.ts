import { UniqueOccupantRecord } from '../../../constants/UniqueOccupantRecord';
import { filterOccupantsByQuestStatus } from '../../../functions/filterOccupantsByQuestStatus';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Occupant } from '../interfaces/Occupants/Occupant';
import { MapId, OverworldMap } from '../interfaces/Overworld';
import { createBlockersForLargeObstacles } from './createBlockersForLargeObstacles';
import { getBaseTileIndex } from './getBaseTileIndex';

export const updateOccupantsOnChange = (
	staticOccupants: Occupant[],
	mapId: MapId,
	quests: SaveFile['quests']
): Occupant[] => {
	let updatedOccupants = staticOccupants.concat(
		filterOccupantsByQuestStatus(
			Object.values(UniqueOccupantRecord).filter(
				(occ) => occ.position.currentMapId === mapId
			),
			quests
		)
	);
	updatedOccupants = createBlockersForLargeObstacles(updatedOccupants);

	return updatedOccupants;
};

export const completeRawMap = (
	rawMap: OverworldMap,
	saveFile: SaveFile
): OverworldMap => {
	let updatedMap = { ...rawMap };

	const updatedOccupants = updateOccupantsOnChange(
		rawMap.occupants ?? [],
		rawMap.id,
		saveFile.quests
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
