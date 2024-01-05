import { QuestCondition } from './Quest';

export enum CustomEventEnum {
	starterSelection = 'starterSelection',
}

export interface CustomEvent {
	id: CustomEventEnum;
	condition: QuestCondition;
}
export const StarterSelectionEvent: CustomEvent = {
	id: CustomEventEnum.starterSelection,
	condition: {
		type: 'HANDLED_OCCUPANT',
		id: 'oak',
		conditionFailMessage: 'You should speak to Professor Oak first.',
	},
};
