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

export const useSaveGame = () => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? '');
	const [updateSaveFile] = usePutSaveFileMutation();

	return useCallback(
		(
			mapId: string,
			progressEntries: Record<string, string[]>,
			offsetX: number,
			offsetY: number,
			orientation: Direction,
			collectedItems?: ItemName[]
		) => {
			if (!saveFile) {
				return;
			}

			const updatedInventory = addCollectedItemsToInventory(
				saveFile.inventory,
				collectedItems
			);
			const updatedProgress = updateMapProgress(
				saveFile.mapProgress,
				progressEntries
			);

			void updateSaveFile({
				...saveFile,
				position: { x: offsetX, y: offsetY },
				orientation,
				currentMapId: mapId,
				mapProgress: updatedProgress,
				inventory: updatedInventory,
			});
		},
		[saveFile, updateSaveFile]
	);
};
