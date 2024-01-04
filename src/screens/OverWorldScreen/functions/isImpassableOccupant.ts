import { Occupant } from '../interfaces/Occupant';
import { isOverworldItem } from './isNpc';

export const isImpassableOccupant = (occupant?: Occupant): boolean => {
	if (!occupant) {
		return false;
	}
	if (isOverworldItem(occupant) && occupant.handled) {
		return false;
	}
	return true;
};
