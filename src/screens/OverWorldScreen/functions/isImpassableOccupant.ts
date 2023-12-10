import { Occupant } from '../interfaces/Occupant';

export const isImpassableOccupant = (occupant?: Occupant): boolean => {
	if (!occupant) {
		return false;
	}
	if (occupant.type === 'ITEM' && occupant.handled) {
		return false;
	}
	return true;
};
