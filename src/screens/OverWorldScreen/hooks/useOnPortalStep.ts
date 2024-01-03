import { useMemo } from 'react';
import { Tile } from '../interfaces/Overworld';
import { PortalEvent } from '../interfaces/OverworldEvent';

export const useOnPortalStep = (
	currentField: Tile,
	handlePortalEvent: (x: PortalEvent) => void
) => {
	return useMemo(() => {
		if (currentField?.onStep?.type === 'PORTAL') {
			handlePortalEvent(currentField.onStep);
		}
	}, [currentField, handlePortalEvent]);
};
