import { SaveFile } from '../interfaces/SaveFile';
import { Occupant } from '../screens/OverWorldScreen/interfaces/Occupants/Occupant';

export const filterOccupantsByQuestStatus = (
	occupants: Occupant[],
	quests: SaveFile['quests']
): Occupant[] => {
	return occupants.filter((o) => {
		if (!o.questCondition) {
			//Occupant has no quest condition, always display
			return true;
		}
		if (o.questCondition) {
			return quests[o.questCondition.id] === o.questCondition.status;
		}
		return false;
	});
};
