import { Merchant, Npc, Occupant, OverworldItem } from '../interfaces/Occupant';

export const isNpc = (occupant?: Occupant): occupant is Npc => {
	return occupant?.type === 'NPC';
};

export const isMerchant = (occupant?: Occupant): occupant is Merchant => {
	return occupant?.type === 'MERCHANT';
};

export const isOverworldItem = (
	occupant?: Occupant
): occupant is OverworldItem => {
	return occupant?.type === 'ITEM';
};
