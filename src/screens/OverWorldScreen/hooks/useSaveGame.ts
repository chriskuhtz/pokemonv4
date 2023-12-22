import { useCallback } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { ItemName } from '../../../interfaces/Item';
import { addCollectedItemsToInventory } from '../functions/addCollectedItemsToInventory';
import { updateMapProgress } from '../functions/updateMapProgress';

export const useSaveGame = (
	mapId: string,
	handledOccupants: string[],
	offsetX: number,
	offsetY: number,
	orientation: Direction,
	collectedItems?: ItemName[]
) => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? '');
	const [updateSaveFile] = usePutSaveFileMutation();

	return useCallback(() => {
		if (!saveFile) {
			return;
		}

		const updatedInventory = addCollectedItemsToInventory(
			saveFile.inventory,
			collectedItems
		);
		const updatedProgress = updateMapProgress(
			saveFile.mapProgress,
			mapId,
			handledOccupants
		);
		void updateSaveFile({
			...saveFile,
			position: { x: offsetX, y: offsetY },
			orientation,
			currentMapId: mapId,
			mapProgress: updatedProgress,
			inventory: updatedInventory,
		});
	}, [
		saveFile,
		mapId,
		handledOccupants,
		collectedItems,
		updateSaveFile,
		offsetX,
		offsetY,
		orientation,
	]);
};
