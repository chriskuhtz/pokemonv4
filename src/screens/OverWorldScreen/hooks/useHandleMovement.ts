import { useCallback } from 'react';

export const useHandleMovement = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	offsetX: number,
	offsetY: number,
	setWalking: () => void
) => {
	return useCallback(
		(key: React.KeyboardEvent<HTMLDivElement>['key']) => {
			if (key === 'w' || key === 'ArrowUp') {
				setWalking();
				setOffsetY(offsetY - 1);
			}
			if (key === 's' || key === 'ArrowDown') {
				setWalking();
				setOffsetY(offsetY + 1);
			}
			if (key === 'd' || key === 'ArrowRight') {
				setWalking();
				setOffsetX(offsetX + 1);
			}
			if (key === 'a' || key === 'ArrowLeft') {
				setWalking();
				setOffsetX(offsetX - 1);
			}
		},
		[offsetX, offsetY, setOffsetX, setOffsetY, setWalking]
	);
};
