import { Direction } from '../../../interfaces/Direction';
import { Movement } from './Movement';
import { Position } from './Position';

export type OccupantType = 'NPC' | 'ITEM';
export interface BaseOccupant {
	id: string;
	position: Position;
	type: OccupantType;
	handled?: boolean;
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
	item: string;
	type: 'ITEM';
}

export type Occupant = Npc | OverworldItem;
