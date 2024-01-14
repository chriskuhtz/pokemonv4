import { Occupant } from '../screens/OverWorldScreen/interfaces/Occupants/Occupant';

//every occupant that can be handled should be unique
export type UniqueOccupantId =
	| 'oak-beforeStarterSelection'
	| 'oak-afterStarterSelection'
	| 'nurse-quest';
export const UniqueOccupantRecord: Record<UniqueOccupantId, Occupant> = {};
