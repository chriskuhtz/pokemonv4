import { SaveFile } from '../../../interfaces/SaveFile';

export const updateMapProgress = (
	currentMapProgress: SaveFile['mapProgress'],
	progressEntries: Record<string, string[]>
) => {
	const updatedProgress = { ...currentMapProgress };

	Object.entries(progressEntries).forEach(([mapId, handledOccupants]) => {
		if (updatedProgress[mapId]) {
			updatedProgress[mapId] = {
				...updatedProgress[mapId],
				handledOccupants: handledOccupants,
			};
		} else
			updatedProgress[mapId] = {
				handledOccupants: handledOccupants,
			};
	});

	return updatedProgress;
};
