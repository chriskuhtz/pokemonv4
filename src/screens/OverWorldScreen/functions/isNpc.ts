import { Npc, Occupant } from '../interfaces/Occupant';

export const isNpc = (occupant?: Occupant): occupant is Npc => {
	return occupant?.type === 'NPC';
};
