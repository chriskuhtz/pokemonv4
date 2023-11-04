import { useCallback } from 'react';

export const useHandleMovement = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	offsetX: number,
	offsetY: number
) => {
	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === 'w' || key === 'ArrowUp') {
				setOffsetY(offsetY - 1);
			}
			if (key === 's' || key === 'ArrowDown') {
				setOffsetY(offsetY + 1);
			}
			if (key === 'd' || key === 'ArrowRight') {
				setOffsetX(offsetX + 1);
			}
			if (key === 'a' || key === 'ArrowLeft') {
				setOffsetX(offsetX - 1);
			}
		},
		[offsetX, offsetY, setOffsetX, setOffsetY]
	);
};
