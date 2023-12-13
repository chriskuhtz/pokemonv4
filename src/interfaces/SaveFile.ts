import { Position } from '../screens/OverWorldScreen/interfaces/Position';
import { Direction } from './Direction';
import { ItemName, ItemStack } from './Item';

export interface RouteProgress {
	handledOccupants: string[];
}
export interface SaveFile {
	username: string;
	orientation: Direction;
	sprite: number;
	position: Position;
	id: string;
	mapProgress: Record<string, RouteProgress>;
	inventory: Record<ItemName, ItemStack>;
}
