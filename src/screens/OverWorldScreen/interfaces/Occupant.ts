import { Direction } from '../../../interfaces/Direction';
import { ItemName } from '../../../interfaces/Item';
import { Movement } from './Movement';
import { Position } from './Position';

export type OccupantType = 'NPC' | 'ITEM';
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
export interface OverworldItem extends BaseOccupant {
	item: ItemName;
	type: 'ITEM';
}

export type Occupant = Npc | OverworldItem;
