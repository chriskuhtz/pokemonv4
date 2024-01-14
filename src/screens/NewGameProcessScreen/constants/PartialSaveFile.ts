import { v4 } from 'uuid';
import { SaveFile } from '../../../interfaces/SaveFile';

export const PARTIAL_SAVE_FILE: Partial<SaveFile> = {
	overworldPosition: {
		position: { x: 0, y: 0 },
		orientation: 'Down',
		currentMapId: 'starter-town',
	},
	id: v4(),
	handledOccupants: {
		'nurse-quest': false,
		'oak-afterStarterSelection': false,
		'oak-beforeStarterSelection': false,
	},
	money: 5000,
	inventory: {
		potion: 0,
		repel: 0,
		'poke-ball': 0,
	},
	pokemon: [],
	pokedex: [],
	quests: {
		pickStarter: 'inactive',
		talkToNurseJoy: 'inactive',
	},
};
