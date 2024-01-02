import { RouteProgress, SaveFile } from '../../../interfaces/SaveFile';
import { OverworldItem } from '../interfaces/Occupant';

export const addCollectedItemsToInventory = (
	currentInventory: SaveFile['inventory'],
	collectedItems?: OverworldItem[],
	mapProgress?: Record<string, RouteProgress>
): SaveFile['inventory'] => {
	const updatedInventory = { ...currentInventory };

	if (collectedItems && mapProgress) {
		collectedItems.map(({ item }) => {
			if (updatedInventory[item]) {
				updatedInventory[item] = {
					...updatedInventory[item],
					amount: updatedInventory[item].amount + 1,
				};
			} else updatedInventory[item] = { amount: 1, item: { id: item } };
		});
	}
	return updatedInventory;
};
