import { Npc } from '../interfaces/Occupant';
import { WatchedField } from '../interfaces/WatchedField';

export const getWatchedFields = (npc: Npc): WatchedField[] => {
	const res: WatchedField[] = [];
	if (!npc.viewRange || !npc.watching) {
		return res;
	}

	Array.from({ length: npc.viewRange + 1 }).forEach((_, i) => {
		if (i === 0) {
			return;
		}
		const { position, orientation } = npc;
		const { x, y } = position;
		res.push({
			watcherId: npc.id,
			position: {
				x: orientation === 'Left' ? x - i : orientation === 'Right' ? x + i : x,
				y: orientation === 'Up' ? y - i : orientation === 'Down' ? y + i : y,
			},
		});
	});

	return res;
};
