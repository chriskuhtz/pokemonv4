import { UniqueOccupantId } from '../constants/UniqueOccupantRecord';
import { Position } from '../screens/OverWorldScreen/interfaces/Position';
import { DexEntry } from './DexEntry';
import { Direction } from './Direction';
import { ItemName } from './Item';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestStatus, QuestsEnum } from './Quest';

export type Inventory = Record<ItemName, number>;
export interface OverworldPosition {
	position: Position;
	currentMapId: string;
	orientation: Direction;
}
export interface SaveFile {
	username: string;
	overworldPosition: OverworldPosition;
	sprite: string;
	id: string;
	handledOccupants: Record<UniqueOccupantId, boolean>;
	inventory: Inventory;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
	quests: Record<QuestsEnum, QuestStatus>;
}
