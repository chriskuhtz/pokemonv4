import {
	Direction,
	Position,
} from '../screens/OverWorldScreen/interfaces/Overworld';

export interface SaveFile {
	username: string;
	orientation: Direction;
	sprite: number;
	position: Position;
}
