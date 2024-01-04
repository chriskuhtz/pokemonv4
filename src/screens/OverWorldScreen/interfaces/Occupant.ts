import { Direction } from '../../../interfaces/Direction';
import { Item, ItemName } from '../../../interfaces/Item';
import { Movement } from './Movement';
import { Position } from './Position';

export type OccupantType = 'NPC' | 'ITEM' | 'MERCHANT';
export interface BaseOccupant {
	id: string;
	position: Position;
	type: OccupantType;
	handled?: boolean;
	focused?: boolean;
}
export interface Npc extends BaseOccupant {
	dialogue: string[];
	orientation: Direction;
	sprite: number;
	movement?: Movement;
	viewRange?: number;
	watching?: boolean;
	type: 'NPC';
}

export interface Merchant extends BaseOccupant {
	type: 'MERCHANT';
	dialogue: string[];
	orientation: Direction;
	sprite: number;
	inventory: Item[];
}
export interface OverworldItem extends BaseOccupant {
	item: ItemName;
	type: 'ITEM';
}

export type Occupant = Npc | OverworldItem | Merchant;
