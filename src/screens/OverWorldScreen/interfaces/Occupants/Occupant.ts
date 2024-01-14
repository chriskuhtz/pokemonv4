import { Direction } from '../../../../interfaces/Direction';
import { QuestsEnum } from '../../../../interfaces/Quest';
import { QuestIdAndStatus } from '../../../../interfaces/QuestIdAndStatus';
import { Inventory } from '../../../../interfaces/SaveFile';
import { Movement } from '../Movement';
import { OverworldEvent } from '../OverworldEvent';
import { Position } from '../Position';

export type OccupantType =
	| 'NPC'
	| 'ITEM'
	| 'MERCHANT'
	| 'HEALER'
	| 'QUEST_CHECK'
	| 'OBSTACLE'
	| 'INVISIBLE_BLOCKER'
	| 'LARGE_OBSTACLE';

export interface BaseOccupant {
	id: string;
	position: Position;
	type: OccupantType;
	handled?: boolean;
	focused?: boolean;
	questUpdates?: QuestIdAndStatus[];
	questCondition?: QuestIdAndStatus;
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
	inventory: Inventory;
}
export interface Healer extends BaseOccupant {
	type: 'HEALER';
	orientation: Direction;
	sprite: string;
}
export interface OverworldItem extends BaseOccupant {
	inventory: Inventory;
	type: 'ITEM';
}
export interface QuestCheck extends BaseOccupant {
	type: 'QUEST_CHECK';
	questId: QuestsEnum;
}
export interface Obstacle extends BaseOccupant {
	sprite: string;
	type: 'OBSTACLE';
	onClick?: OverworldEvent;
}
export interface LargeObstacle extends BaseOccupant {
	sprite: string;
	type: 'LARGE_OBSTACLE';
	height: number;
	width: number;
	clearanceBehind?: number;
	onClick?: OverworldEvent;
}
export interface InvisibleBlocker extends BaseOccupant {
	type: 'INVISIBLE_BLOCKER';
	onClick?: OverworldEvent;
}
export type Occupant =
	| Npc
	| OverworldItem
	| Merchant
	| Healer
	| QuestCheck
	| Obstacle
	| InvisibleBlocker
	| LargeObstacle;
