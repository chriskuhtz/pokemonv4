import { Position } from '../screens/OverWorldScreen/interfaces/Position';
import { DexEntry } from './DexEntry';
import { Direction } from './Direction';
import { ItemName, ItemStack } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
import { Quest } from './Quest';
import { RouteProgress } from './RouteProgress';

export interface SaveFile {
	username: string;
	orientation: Direction;
	sprite: string;
	position: Position;
	currentMapId: string;
	id: string;
	mapProgress: Record<string, RouteProgress>;
	inventory: Record<ItemName, ItemStack>;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
	quests: Quest[];
}
