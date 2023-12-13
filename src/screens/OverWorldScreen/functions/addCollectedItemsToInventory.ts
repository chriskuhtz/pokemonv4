import { ItemName } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';

export const addCollectedItemsToInventory = (
	currentInventory: SaveFile['inventory'],
	collectedItems?: ItemName[]
): SaveFile['inventory'] => {
	const updatedInventory = { ...currentInventory };
	if (collectedItems) {
		collectedItems.map((itemName) => {
			if (updatedInventory[itemName]) {
				updatedInventory[itemName] = {
					...updatedInventory[itemName],
					amount: updatedInventory[itemName].amount + 1,
				};
			} else updatedInventory[itemName] = { amount: 1, item: { id: itemName } };
		});
	}
	return updatedInventory;
};
