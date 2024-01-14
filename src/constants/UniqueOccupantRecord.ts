import { QuestsEnum } from '../interfaces/Quest';
import { Occupant } from '../screens/OverWorldScreen/interfaces/Occupants/Occupant';

//every occupant that can be handled should be unique
export enum UniqueOccupantIds {
	'oak-beforeStarterSelection' = 'oak-beforeStarterSelection',
	'oak-afterStarterSelection' = 'oak-afterStarterSelection',
	'nurse-quest' = 'nurse-quest',
}

export const UniqueOccupantRecord: Record<UniqueOccupantIds, Occupant> = {
	'oak-beforeStarterSelection': {
		id: 'oak-beforeStarterSelection',
		type: 'NPC',
		position: { y: 2, x: 4 },
		orientation: 'Down',
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
	'oak-afterStarterSelection': {
		id: 'oakAfterStarterPick',
		type: 'NPC',
		position: { y: 2, x: 4 },
		orientation: 'Down',
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
	'nurse-quest': {
		id: 'talkToNurseJoy-active',
		type: 'NPC',
		position: { y: 5, x: 8 },
		orientation: 'Left',
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
};
