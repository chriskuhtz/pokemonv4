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
	handled?: boolean;
}

export type OverworldMap = {
	map: Tile[][];
	encounters: string[];
	occupants: Occupant[];
};
export interface Tile {
	onStep?: OverworldEvent;
}

export type Direction = 'Up' | 'Right' | 'Down' | 'Left';
export interface Position {
	x: number;
	y: number;
}

export interface WatchedField {
	position: Position;
	watcherId: string;
}
