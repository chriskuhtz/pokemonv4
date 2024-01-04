import { useCallback } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { addCollectedItemsToInventory } from '../functions/addCollectedItemsToInventory';
import { updateMapProgress } from '../functions/updateMapProgress';
import { OverworldItem } from '../interfaces/Occupant';

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
			collectedItems?: OverworldItem[],
			heal?: boolean
		) => {
			if (!saveFile) {
				return;
			}

			const updatedInventory = addCollectedItemsToInventory(
				saveFile.inventory,
				collectedItems,
				saveFile.mapProgress
			);
			const updatedProgress = updateMapProgress(
				saveFile.mapProgress,
				progressEntries
			);

			let updatedPokemon = [...saveFile.pokemon];
			if (heal) {
				updatedPokemon = updatedPokemon.map((p) => {
					if (p.onTeam) {
						return { ...p, damage: 0 };
					}
					return p;
				});
			}
			void updateSaveFile({
				...saveFile,
				position: { x: offsetX, y: offsetY },
				orientation,
				currentMapId: mapId,
				mapProgress: updatedProgress,
				inventory: updatedInventory,
				pokemon: updatedPokemon,
			});
		},
		[saveFile, updateSaveFile]
	);
};
