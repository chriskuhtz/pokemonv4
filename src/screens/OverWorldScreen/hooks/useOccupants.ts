import { useCallback, useMemo, useState } from 'react';
import { Occupant } from '../interfaces/Occupant';
import { OverworldMap } from '../interfaces/Overworld';

export const useOccupants = (currentWorld: OverworldMap) => {
	const [occupants, setOccupants] = useState<Occupant[]>([
		...currentWorld.occupants,
	]);

	const focusedOccupant = useMemo(() => {
		return occupants.find((o) => o.focused);
	}, [occupants]);

	const handledOccupantIds = useMemo(() => {
		return occupants.filter((o) => o.handled).map((o) => o.id);
	}, [occupants]);

	const unfocusOccupant = useCallback(
		(id: string) => {
			if (!focusedOccupant) {
				return;
			}
			setOccupants((occupants) =>
				occupants.map((o) => {
					if (id === o.id) {
						return { ...o, focused: false };
					}
					return o;
				})
			);
		},
		[focusedOccupant]
	);

	const focusOccupant = useCallback(
		(id: string) => {
			if (focusedOccupant) return;
			setOccupants((occupants) =>
				occupants.map((o) => {
					if (id === o.id) {
						return { ...o, focused: true, watching: false };
					}
					return o;
				})
			);
		},
		[focusedOccupant]
	);

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
		unfocusOccupant,
		focusOccupant,
		handleOccupants,
		setOccupants,
		focusedOccupant,
		handledOccupantIds,
	};
};
