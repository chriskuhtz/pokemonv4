import { Occupant } from './Occupant';
import { OverworldEvent } from './OverworldEvent';

export type OverworldMap = {
	id: string;
	map: Tile[][];
	encounters: string[];
	occupants: Occupant[];
	baseTile: string;
};
export interface Tile {
	onStep?: OverworldEvent;
}
