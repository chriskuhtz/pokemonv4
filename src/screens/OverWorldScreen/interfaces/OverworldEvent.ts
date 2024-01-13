import { Direction } from '../../../interfaces/Direction';
import { RoutesEnum } from '../../../router/router';

export interface BaseEvent {
	type: 'ENCOUNTER' | 'PORTAL' | 'ROUTE';
}

export interface EncounterEvent extends BaseEvent {
	type: 'ENCOUNTER';
}

export interface PortalEvent extends BaseEvent {
	type: 'PORTAL';
	mapId: string;
	x: number;
	y: number;
	orientation: Direction;
}
export interface RouterEvent extends BaseEvent {
	type: 'ROUTE';
	to: RoutesEnum;
}

export type OverworldEvent = EncounterEvent | PortalEvent | RouterEvent;
