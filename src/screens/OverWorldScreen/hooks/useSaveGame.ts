import { useCallback } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';

export const useSaveGame = (
	mapId: string,
	handledTrainers: string[],
	offsetX: number,
	offsetY: number,
	orientation: Direction
) => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? '');
	const [updateSaveFile] = usePutSaveFileMutation();

	return useCallback(() => {
		if (!saveFile) {
			return;
		}
		const updatedProgress = { ...saveFile.mapProgress };
		if (updatedProgress[mapId]) {
			updatedProgress[mapId] = {
				...updatedProgress[mapId],
				handledTrainers: handledTrainers,
			};
		} else
			updatedProgress[mapId] = {
				handledTrainers: handledTrainers,
			};

		void updateSaveFile({
			...saveFile,
			position: { x: offsetX, y: offsetY },
			orientation,
			mapProgress: updatedProgress,
		});
	}, [
		mapId,
		handledTrainers,
		offsetX,
		offsetY,
		orientation,
		saveFile,
		updateSaveFile,
	]);
};
