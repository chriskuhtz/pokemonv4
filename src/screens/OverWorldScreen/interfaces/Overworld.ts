import { Occupant } from './Occupants/Occupant';
import { BaseTileId, Tile } from './Tile';

export type OverworldMap = {
	id: string;
	map: Tile[][];
	encounters: string[];
	occupants: Occupant[];
	baseTile: BaseTileId;
};
