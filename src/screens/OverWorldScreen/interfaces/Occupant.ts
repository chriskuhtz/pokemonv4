import { CustomEventEnum } from '../../../interfaces/CustomEvent';
import { Direction } from '../../../interfaces/Direction';
import { Item, ItemName } from '../../../interfaces/Item';
import { QuestsEnum } from '../../../interfaces/Quest';
import { Movement } from './Movement';
import { Position } from './Position';

export type OccupantType =
	| 'NPC'
	| 'ITEM'
	| 'MERCHANT'
	| 'HEALER'
	| 'QUEST_CHECK'
	| 'CUSTOM_EVENT'
	| 'OBSTACLE'
	| 'INVISIBLE_BLOCKER';
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
	sprite: string;
	movement?: Movement;
	viewRange?: number;
	watching?: boolean;
	type: 'NPC';
}

export interface Merchant extends BaseOccupant {
	type: 'MERCHANT';
	dialogue: string[];
	orientation: Direction;
	sprite: string;
	inventory: Item[];
}
export interface Healer extends BaseOccupant {
	type: 'HEALER';
	orientation: Direction;
	sprite: string;
}
export interface OverworldItem extends BaseOccupant {
	item: ItemName;
	type: 'ITEM';
}
export interface QuestCheck extends BaseOccupant {
	type: 'QUEST_CHECK';
	questId: QuestsEnum;
}
export interface CustomEventOccupant extends BaseOccupant {
	eventId: CustomEventEnum;
	type: 'CUSTOM_EVENT';
	sprite: string;
}
export interface Obstacle extends BaseOccupant {
	sprite: string;
	type: 'OBSTACLE';
	height: number;
	width: number;
}
export interface InvisibleBlocker extends BaseOccupant {
	type: 'INVISIBLE_BLOCKER';
}
export type Occupant =
	| Npc
	| OverworldItem
	| Merchant
	| Healer
	| QuestCheck
	| CustomEventOccupant
	| Obstacle
	| InvisibleBlocker;
