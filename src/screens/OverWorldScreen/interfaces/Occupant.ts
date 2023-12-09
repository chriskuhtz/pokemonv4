import { Direction } from '../../../interfaces/Direction';
import { Movement } from './Movement';
import { Position } from './Position';

export interface Occupant {
	id: string;
	dialogue: string[];
	orientation: Direction;
	sprite: number;
	position: Position;
	movement?: Movement;
	viewRange?: number;
	watching?: boolean;
}
