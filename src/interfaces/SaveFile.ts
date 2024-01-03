import { Position } from '../screens/OverWorldScreen/interfaces/Position';
import { Direction } from './Direction';
import { ItemName, ItemStack } from './Item';

export interface RouteProgress {
	handledOccupants: string[];
}

export interface OwnedPokemon {
	dexId: number;
	id: string;
	onTeam?: boolean;
	xp: number;
}

export interface DexEntry {
	dexId: number;
	status: 'seen' | 'owned';
}
export interface SaveFile {
	username: string;
	orientation: Direction;
	sprite: number;
	position: Position;
	currentMapId: string;
	id: string;
	mapProgress: Record<string, RouteProgress>;
	inventory: Record<ItemName, ItemStack>;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
}
