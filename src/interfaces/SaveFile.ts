import { Position } from '../screens/OverWorldScreen/interfaces/Overworld';
import { Direction } from './Direction';

export interface RouteProgress {
	handledTrainers: string[];
}
export interface SaveFile {
	username: string;
	orientation: Direction;
	sprite: number;
	position: Position;
	id: string;
	mapProgress: Record<string, RouteProgress>;
}
