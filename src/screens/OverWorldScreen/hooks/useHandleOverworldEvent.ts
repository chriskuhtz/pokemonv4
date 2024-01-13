import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { OverworldEvent } from '../interfaces/OverworldEvent';

export const useHandleOverworldEvent = (save: () => void) => {
	const navigate = useNavigate();
	return useCallback(
		(event: OverworldEvent) => {
			if (event.type === 'ROUTE') {
				save();
				navigate(event.to);
			}
		},
		[navigate, save]
	);
};
