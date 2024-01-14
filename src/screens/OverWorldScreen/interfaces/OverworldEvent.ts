import { Condition } from '../../../interfaces/Quest';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { RoutesEnum } from '../../../router/router';

export interface BaseEvent {
	type: 'ENCOUNTER' | 'PORTAL' | 'ROUTE';
	condition?: Condition;
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
