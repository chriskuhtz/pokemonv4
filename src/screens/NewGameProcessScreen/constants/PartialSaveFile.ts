import { v4 } from 'uuid';
import { SaveFile } from '../../../interfaces/SaveFile';

export const PARTIAL_SAVE_FILE: Partial<SaveFile> = {
	position: { x: 0, y: 0 },
	orientation: 'Down',
	id: v4(),
	currentMapId: 'merchantTest',
	mapProgress: {},
	money: 5000,
	pokemon: [
		{ dexId: 25, id: v4(), onTeam: true, xp: 100 },
		{ dexId: 1, id: v4(), xp: 100 },
	],
	pokedex: [
		{ dexId: 25, status: 'owned' },
		{ dexId: 1, status: 'owned' },
		{ dexId: 234, status: 'seen' },
		{ dexId: 17, status: 'seen' },
	],
	quests: [
		{
			status: 'active',
			id: v4(),
			title: 'Pick a Starter Pokemon',
			description: 'Every Trainer must choose a Starter Pokemon.',
			rewardMoney: 1000,
			rewardItems: [{ amount: 5, item: { id: 'potion' } }],
			condition: {
				type: 'OWNED_POKEMON',
				ids: [1, 4, 7],
				mode: 'SOME',
			},
		},
	],
};
