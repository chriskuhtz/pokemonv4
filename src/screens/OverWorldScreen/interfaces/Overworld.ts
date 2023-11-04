export interface EncounterEvent {
	type: 'ENCOUNTER';
}

export type OverworldEvent = EncounterEvent;

export interface Occupant {
	id: string;
	dialogue: string[];
	orientation: Direction;
	sprite: number;
	position: Position;
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
