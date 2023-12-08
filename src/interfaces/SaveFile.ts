import { Position } from '../screens/OverWorldScreen/interfaces/Overworld';
import { Direction } from './Direction';

export interface SaveFile {
	username: string;
	orientation: Direction;
	sprite: number;
	position: Position;
	id: string;
}
