export type ItemName = 'potion' | 'poke-ball' | 'repel';
export interface Item {
	id: ItemName;
}
export interface ItemStack {
	item: Item;
	amount: number;
}
