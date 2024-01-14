import { addItemStacksToInventory } from '../../../functions/addItemStacksToInventory';
import { ItemStack } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';

export const addCollectedItemsToInventory = (
	currentInventory: SaveFile['inventory'],
	collectedItemStacks?: ItemStack[]
): SaveFile['inventory'] => {
	if (collectedItemStacks) {
		const updatedInventory = addItemStacksToInventory(
			currentInventory,
			collectedItemStacks
		);
		return updatedInventory;
	}
	return currentInventory;
};
