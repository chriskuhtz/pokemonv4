import { ItemStack } from './Item';

export interface OwnedPokemonCondition {
	type: 'OWNED_POKEMON';
	ids: number[];
	mode: 'SOME' | 'ALL';
	conditionFailMessage?: string;
}
export interface HandledOccupantCondition {
	type: 'HANDLED_OCCUPANT';
	id: string;
	conditionFailMessage?: string;
}

export type QuestCondition = OwnedPokemonCondition | HandledOccupantCondition;
export interface Quest {
	status: 'active' | 'completed';
	id: QuestsEnum;
	title: string;
	description: string;
	rewardMoney?: number;
	rewardItems?: ItemStack[];
	condition: QuestCondition;
}

export enum QuestsEnum {
	pickStarter = 'pickStarter',
}

export const PickStarterQuest: Quest = {
	status: 'active',
	id: QuestsEnum.pickStarter,
	title: 'Pick a Starter Pokemon',
	description: 'Every Trainer must choose a Starter Pokemon.',
	rewardMoney: 1000,
	rewardItems: [{ amount: 5, item: { id: 'potion' } }],
	condition: {
		type: 'OWNED_POKEMON',
		ids: [1, 4, 7],
		mode: 'SOME',
	},
};
