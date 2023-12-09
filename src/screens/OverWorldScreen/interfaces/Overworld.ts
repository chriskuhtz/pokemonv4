import { Direction } from '../../../interfaces/Direction';

export interface EncounterEvent {
	type: 'ENCOUNTER';
}

export type OverworldEvent = EncounterEvent;

export interface Rotating {
	type: 'ROTATING';
}
export interface Pathing {
	type: 'PATHING';
	path: Position[];
	index: number;
}
export type Movement = Rotating | Pathing;
export interface Occupant {
	id: string;
	dialogue: string[];
	orientation: Direction;
	sprite: number;
	position: Position;
	movement?: Movement;
	viewRange?: number;
	watching?: boolean;
}

export type OverworldMap = {
	id: string;
	map: Tile[][];
	encounters: string[];
	occupants: Occupant[];
};
export interface Tile {
	onStep?: OverworldEvent;
}

export interface Position {
	x: number;
	y: number;
}

export interface WatchedField {
	position: Position;
	watcherId: string;
}
