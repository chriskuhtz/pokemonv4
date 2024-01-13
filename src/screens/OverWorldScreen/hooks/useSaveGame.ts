import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import {
	selectCollectedItems,
	selectHandledOccupantIds,
} from '../../../slices/occupantsSlice';
import { addCollectedItemsToInventory } from '../functions/addCollectedItemsToInventory';
import { updateMapProgress } from '../functions/updateMapProgress';

export interface MapPosition {
	mapId: string;
	offsetX: number;
	offsetY: number;
	orientation: Direction;
}
export const useSaveGame = () => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? '');
	const [updateSaveFile] = usePutSaveFileMutation();
	const collectedItems = useSelector(selectCollectedItems);
	const handledOccupantIds = useSelector(selectHandledOccupantIds);

	return useCallback(
		(
			currentCoordinates: MapPosition,
			nextCoordinates?: MapPosition,
			heal?: boolean
		) => {
			if (!saveFile) {
				return;
			}
			const progressEntries = {
				[`${currentCoordinates.mapId}`]: handledOccupantIds,
			};

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
				position: {
					x: nextCoordinates?.offsetX ?? currentCoordinates.offsetX,
					y: nextCoordinates?.offsetY ?? currentCoordinates.offsetY,
				},
				orientation:
					nextCoordinates?.orientation ?? currentCoordinates.orientation,
				currentMapId: nextCoordinates?.mapId ?? currentCoordinates.mapId,
				mapProgress: updatedProgress,
				inventory: updatedInventory,
				pokemon: updatedPokemon,
			});
		},
		[collectedItems, handledOccupantIds, saveFile, updateSaveFile]
	);
};
