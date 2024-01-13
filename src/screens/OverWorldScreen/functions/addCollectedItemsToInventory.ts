import { addItemStacksToInventory } from '../../../functions/addItemStacksToInventory';
import { ItemStack } from '../../../interfaces/Item';
import { RouteProgress } from '../../../interfaces/RouteProgress';
import { SaveFile } from '../../../interfaces/SaveFile';
import { OverworldItem } from '../interfaces/Occupant';

export const addCollectedItemsToInventory = (
	currentInventory: SaveFile['inventory'],
	collectedItems?: OverworldItem[],
	mapProgress?: Record<string, RouteProgress>
): SaveFile['inventory'] => {
	if (collectedItems && mapProgress) {
		const collectedItemsAsStacks: ItemStack[] = collectedItems?.map((o) => {
			return { amount: 1, item: { id: o.item } };
		});
		const updatedInventory = addItemStacksToInventory(
			currentInventory,
			collectedItemsAsStacks
		);
		return updatedInventory;
	}
	return currentInventory;
};
