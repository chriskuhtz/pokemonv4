import { Direction } from '../../../interfaces/Direction';

export interface BaseEvent {
	type: 'ENCOUNTER' | 'PORTAL';
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

export type OverworldEvent = EncounterEvent | PortalEvent;
