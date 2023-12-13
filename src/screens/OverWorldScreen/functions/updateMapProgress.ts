import { SaveFile } from '../../../interfaces/SaveFile';

export const updateMapProgress = (
	currentMapProgress: SaveFile['mapProgress'],
	mapId: string,
	handledOccupants: string[]
) => {
	const updatedProgress = { ...currentMapProgress };
	if (updatedProgress[mapId]) {
		updatedProgress[mapId] = {
			...updatedProgress[mapId],
			handledOccupants: handledOccupants,
		};
	} else
		updatedProgress[mapId] = {
			handledOccupants: handledOccupants,
		};

	return updatedProgress;
};
