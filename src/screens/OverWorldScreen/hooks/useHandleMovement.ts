import { useCallback } from 'react';

export const useHandleMovement = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	offsetX: number,
	offsetY: number
) => {
	return useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === 'w' || e.key === 'ArrowUp') {
				setOffsetY(offsetY - 1);
			}
			if (e.key === 's' || e.key === 'ArrowDown') {
				setOffsetY(offsetY + 1);
			}
			if (e.key === 'd' || e.key === 'ArrowRight') {
				setOffsetX(offsetX + 1);
			}
			if (e.key === 'a' || e.key === 'ArrowLeft') {
				setOffsetX(offsetX - 1);
			}
		},
		[offsetX, offsetY, setOffsetX, setOffsetY]
	);
};
