import { Occupant, QuestCheck } from '../interfaces/Occupant';
import { isOverworldItem, isQuestCheck } from './OccupantTypeGuards';

export const isImpassableOccupant = (
	isQuestCompleted: (x: QuestCheck) => boolean,
	occupant?: Occupant
): boolean => {
	if (!occupant) {
		return false;
	}
	if (isOverworldItem(occupant) && occupant.handled) {
		return false;
	}
	if (isQuestCheck(occupant) && isQuestCompleted(occupant)) {
		return false;
	}
	return true;
};
