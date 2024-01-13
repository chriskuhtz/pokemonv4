import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { OverworldEvent } from '../interfaces/OverworldEvent';

export const useHandleOverworldEvent = () => {
	const navigate = useNavigate();
	return useCallback(
		(event: OverworldEvent) => {
			if (event.type === 'ROUTE') {
				navigate(event.to);
			}
		},
		[navigate]
	);
};
