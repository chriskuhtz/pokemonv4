import { Occupant, WatchedField } from '../interfaces/Overworld';

export const getWatchedFields = (occupant: Occupant): WatchedField[] => {
	const res: WatchedField[] = [];
	if (!occupant.viewRange || !occupant.watching) {
		return res;
	}

	Array.from({ length: occupant.viewRange + 1 }).forEach((_, i) => {
		if (i === 0) {
			return;
		}
		const { position, orientation } = occupant;
		const { x, y } = position;
		res.push({
			watcherId: occupant.id,
			position: {
				x: orientation === 'Left' ? x - i : orientation === 'Right' ? x + i : x,
				y: orientation === 'Up' ? y - i : orientation === 'Down' ? y + i : y,
			},
		});
	});

	return res;
};
