import { QuestsEnum } from '../interfaces/Quest';
import { Occupant } from '../screens/OverWorldScreen/interfaces/Occupants/Occupant';

//every occupant that can be handled should be unique
export enum UniqueOccupantIds {
	'starter-town-oak-before-selection' = 'starter-town-oak-before-selection',
	'starter-town-oak-after-selection' = 'starter-town-oak-after-selection',
	'starter-town-nurse-quest' = 'starter-town-nurse-quest',
	'starter-town-merchant' = 'starter-town-merchant',
	'starter-town-nurse' = 'starter-town-nurse',
	'starter-town-ballMachine' = 'starter-town-ballMachine',
}

export const UniqueOccupantRecord: Record<UniqueOccupantIds, Occupant> = {
	'starter-town-oak-before-selection': {
		id: 'starter-town-oak-before-selection',
		type: 'NPC',
		position: {
			position: { y: 2, x: 4 },
			currentMapId: 'starter-town',
			orientation: 'Down',
		},
		dialogue: [
			'Hello',
			"It's nice to meet you.",
			'Congratulations on obtaining your Pokemon Trainer License.',
			'It is my privilege and responsibility to give you your first Pokemon.',
			'For your first Pokemon Partner, you can choose one from the Machine next to me.',
		],
		sprite: '136',
		questUpdates: [
			{
				id: QuestsEnum.talkToNurseJoy,
				status: 'active',
			},
		],
		questCondition: { id: QuestsEnum.pickStarter, status: 'active' },
	},
	'starter-town-oak-after-selection': {
		id: 'oakAfterStarterPick',
		type: 'NPC',
		position: {
			position: { y: 2, x: 4 },
			currentMapId: 'starter-town',
			orientation: 'Down',
		},
		dialogue: [
			'Aah, what an excellent choice',
			'I am sure this Pokemon will become an excellent Partner',
			'I look forward to hearing about your many adventures',
		],
		sprite: '136',
		questCondition: {
			id: QuestsEnum['pickStarter'],
			status: 'completed',
		},
	},
	'starter-town-nurse-quest': {
		id: 'talkToNurseJoy-active',
		type: 'NPC',
		position: {
			position: { y: 5, x: 8 },
			currentMapId: 'starter-town',
			orientation: 'Left',
		},
		dialogue: [
			'Welcome to the world of Pokemon',
			'Please visit me any time your Pokemon is hurt',
			'I will also give these potions',
			'Use them for first aid in the field',
		],
		questUpdates: [
			{
				id: QuestsEnum['talkToNurseJoy'],
				status: 'completed',
			},
		],
		sprite: '115',
		questCondition: { id: QuestsEnum['talkToNurseJoy'], status: 'active' },
	},
	'starter-town-merchant': {
		id: 'starter-town-merchant',
		type: 'MERCHANT',
		position: {
			position: { y: 4, x: 8 },
			currentMapId: 'starter-town',
			orientation: 'Left',
		},
		inventory: { potion: 100, 'poke-ball': 100, repel: 100 },
		dialogue: ['What do you need?'],
		sprite: '113',
	},
	'starter-town-nurse': {
		id: 'starter-town-nurse',
		type: 'HEALER',
		position: {
			position: { y: 5, x: 8 },
			currentMapId: 'starter-town',
			orientation: 'Left',
		},
		sprite: '113',
		questCondition: { id: QuestsEnum.talkToNurseJoy, status: 'completed' },
	},
	'starter-town-ballMachine': {
		id: 'starter-town-ballMachine',
		type: 'LARGE_OBSTACLE',
		position: {
			position: { y: 2, x: 5 },
			currentMapId: 'starter-town',
			orientation: 'Left',
		},
		sprite: 'pokeballMachine',
		height: 3,
		width: 2,
		clearanceBehind: 1,
		onClick: {
			type: 'ROUTE',
			to: '/starterSelection',
			condition: {
				type: 'NOT_REGISTERED_POKEMON',
				ids: [1, 4, 7],
				mode: 'ALL',
				conditionFailMessage: 'You already chose a starter Pokemon.',
			},
		},
	},
};
