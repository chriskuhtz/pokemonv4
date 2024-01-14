import { Occupant } from './Occupant';
import { Tile, BaseTileId } from './Tile';

export type OverworldMap = {
	id: string;
	map: Tile[][];
	encounters: string[];
	occupants: Occupant[];
	baseTile: BaseTileId;
};
