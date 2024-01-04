import { ItemStack } from './Item';

export interface OwnedPokemonCondition {
	type: 'OWNED_POKEMON';
	ids: number[];
	mode: 'SOME' | 'ALL';
}

export type QuestCondition = OwnedPokemonCondition;
export interface Quest {
	status: 'active' | 'completed';
	id: string;
	title: string;
	description: string;
	rewardMoney?: number;
	rewardItems?: ItemStack[];
	condition: QuestCondition;
}
