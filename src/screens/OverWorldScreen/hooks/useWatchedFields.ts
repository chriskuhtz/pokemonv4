import { useMemo } from 'react';
import { getWatchedFields } from '../functions/getWatchedFields';
import { Occupant } from '../interfaces/Occupant';
import { WatchedField } from '../interfaces/WatchedField';

export const useWatchedFields = (occupants: Occupant[]) => {
	return useMemo(() => {
		let res: WatchedField[] = [];

		occupants.forEach((o) => {
			res = [...res, ...getWatchedFields(o)];
		});

		return res;
	}, [occupants]);
};
