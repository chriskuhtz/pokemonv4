import { useMemo } from 'react';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { Tile } from '../interfaces/Tile';
import { useHandleOverworldEvent } from './useHandleOverworldEvent';

export const useOnPortalStep = (
	currentField: Tile,
	currentPosition: OverworldPosition
) => {
	const handlePortalEvent = useHandleOverworldEvent(currentPosition);
	return useMemo(() => {
		if (currentField?.onStep?.type === 'PORTAL') {
			handlePortalEvent(currentField.onStep);
		}
	}, [currentField, handlePortalEvent]);
};
