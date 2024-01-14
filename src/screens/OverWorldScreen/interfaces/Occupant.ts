import { Direction } from '../../../interfaces/Direction';
import { Item, ItemName } from '../../../interfaces/Item';
import { QuestStatus, QuestsEnum } from '../../../interfaces/Quest';
import { Movement } from './Movement';
import { OverworldEvent } from './OverworldEvent';
import { Position } from './Position';

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
	questUpdates?: {
		id: QuestsEnum;
		status: QuestStatus;
	}[];
	questCondition?: {
		id: QuestsEnum;
		status: QuestStatus;
	};
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

export const UniqueObstacleIds = 'STARTER_SELECTOR';

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
