import { Occupant } from './Occupant';
import { OverworldEvent } from './OverworldEvent';

export type BaseTileId = 'beach' | 'caveFloor' | 'cobblestone' | 'grass';

export const BaseTileMap: Record<BaseTileId, Record<number, number>> = {
	grass: { 1: 10, 2: 20, 3: 30, 4: 40, 5: 100 },
	caveFloor: { 1: 100 },
	beach: { 1: 30, 2: 60, 3: 90, 4: 100 },
	cobblestone: { 1: 18, 2: 36, 3: 54, 4: 72, 5: 90, 6: 100 },
};
export type OverworldMap = {
	id: string;
	map: Tile[][];
	encounters: string[];
	occupants: Occupant[];
	baseTile: BaseTileId;
};
export interface Tile {
	onStep?: OverworldEvent;
}
