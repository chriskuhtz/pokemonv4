import { useMemo } from 'react';
import { isNpc } from '../functions/OccupantTypeGuards';
import { getWatchedFields } from '../functions/getWatchedFields';
import { Occupant } from '../interfaces/Occupant';
import { WatchedField } from '../interfaces/WatchedField';

export const useWatchedFields = (occupants: Occupant[]) => {
	return useMemo(() => {
		let res: WatchedField[] = [];

		occupants.forEach((o) => {
			if (!isNpc(o)) {
				return;
			}
			res = [...res, ...getWatchedFields(o)];
		});

		return res;
	}, [occupants]);
};
