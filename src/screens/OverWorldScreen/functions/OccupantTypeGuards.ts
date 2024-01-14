import {
	Healer,
	InvisibleBlocker,
	LargeObstacle,
	Merchant,
	Npc,
	Obstacle,
	Occupant,
	OverworldItem,
	QuestCheck,
} from '../interfaces/Occupant';

export const isNpc = (occupant?: Occupant): occupant is Npc => {
	return occupant?.type === 'NPC';
};

export const isMerchant = (occupant?: Occupant): occupant is Merchant => {
	return occupant?.type === 'MERCHANT';
};

export const isHealer = (occupant?: Occupant): occupant is Healer => {
	return occupant?.type === 'HEALER';
};

export const isOverworldItem = (
	occupant?: Occupant
): occupant is OverworldItem => {
	return occupant?.type === 'ITEM';
};

export const isObstacle = (occupant?: Occupant): occupant is Obstacle => {
	return occupant?.type === 'OBSTACLE';
};
export const isLargeObstacle = (
	occupant?: Occupant
): occupant is LargeObstacle => {
	return occupant?.type === 'LARGE_OBSTACLE';
};
export const isInvisibleBlocker = (
	occupant?: Occupant
): occupant is InvisibleBlocker => {
	return occupant?.type === 'INVISIBLE_BLOCKER';
};
export const isQuestCheck = (occupant?: Occupant): occupant is QuestCheck => {
	return occupant?.type === 'QUEST_CHECK';
};
