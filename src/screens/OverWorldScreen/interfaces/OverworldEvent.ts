import { QuestIdAndStatus } from '../../../interfaces/QuestIdAndStatus';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { RoutesEnum } from '../../../router/router';

export interface BaseEvent {
	type: 'ENCOUNTER' | 'PORTAL' | 'ROUTE';
	questCondition: QuestIdAndStatus;
	conditionFailMessage?: string[];
}

export interface EncounterEvent extends BaseEvent {
	type: 'ENCOUNTER';
}

export interface PortalEvent extends BaseEvent {
	type: 'PORTAL';
	to: OverworldPosition;
}
export interface RouterEvent extends BaseEvent {
	type: 'ROUTE';
	to: RoutesEnum | string;
}

export type OverworldEvent = EncounterEvent | PortalEvent | RouterEvent;
