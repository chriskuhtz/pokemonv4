import { v4 } from 'uuid';
import {
	PickStarterQuest,
	TalkToNurseJoyQuest,
} from '../../../interfaces/Quest';
import { SaveFile } from '../../../interfaces/SaveFile';

export const PARTIAL_SAVE_FILE: Partial<SaveFile> = {
	position: { x: 0, y: 0 },
	orientation: 'Down',
	id: v4(),
	currentMapId: 'starter-town',
	mapProgress: {},
	money: 5000,
	inventory: {} as SaveFile['inventory'],
	pokemon: [],
	pokedex: [],
	quests: [PickStarterQuest, TalkToNurseJoyQuest],
};
