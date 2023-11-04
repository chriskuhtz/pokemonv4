export interface EncounterEvent {
	type: 'ENCOUNTER';
}

export interface Dialogue {
	passages: string[];
}
export interface DialogueEvent {
	type: 'DIALOGUE';
	id: string;
}

export type OverworldEvent = EncounterEvent | DialogueEvent;

export type OverworldMap = {
	map: Tile[][];
	encounters: string[];
	dialogues: Record<string, Dialogue>;
};
export interface Tile {
	onStep?: OverworldEvent;
	onClick?: OverworldEvent;
	passable: boolean;
}

export type Direction = 'up' | 'right' | 'down' | 'left';
