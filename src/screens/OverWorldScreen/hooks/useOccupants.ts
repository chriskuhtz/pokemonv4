import { useState, useMemo, useCallback } from 'react';
import { Occupant } from '../interfaces/Occupant';
import { OverworldMap } from '../interfaces/Overworld';

export const useOccupants = (currentWorld: OverworldMap) => {
	const [occupants, setOccupants] = useState<Occupant[]>([
		...currentWorld.occupants,
	]);

	const focusedOccupant = useMemo(() => {
		return occupants.find((o) => o.focused);
	}, [occupants]);

	const toggleFocusForOccupant = useCallback((id: string) => {
		setOccupants((occupants) =>
			occupants.map((o) => {
				if (id === o.id) {
					if (o.focused) {
						return { ...o, focused: false };
					}
					return { ...o, focused: true };
				} else return o;
			})
		);
	}, []);

	const handleOccupants = useCallback((ids: string[]) => {
		setOccupants((occupants) =>
			occupants.map((o) => {
				if (ids.includes(o.id)) {
					return { ...o, handled: true, focused: false };
				} else return o;
			})
		);
	}, []);

	return {
		occupants,
		toggleFocusForOccupant,
		handleOccupants,
		setOccupants,
		focusedOccupant,
	};
};
