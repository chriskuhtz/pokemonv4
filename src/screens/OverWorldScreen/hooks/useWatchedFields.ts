import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectOccupants } from '../../../slices/occupantsSlice';
import { isNpc } from '../functions/OccupantTypeGuards';
import { getWatchedFields } from '../functions/getWatchedFields';
import { WatchedField } from '../interfaces/WatchedField';

export const useWatchedFields = () => {
	const occupants = useSelector(selectOccupants);
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
