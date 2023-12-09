import { Direction } from '../../../interfaces/Direction';

export const getNewOrientationAfterKeyPress = (
	key: React.KeyboardEvent<HTMLDivElement>['key'],
	orientation: Direction
): Direction | undefined => {
	if ((key === 'w' || key === 'ArrowUp') && orientation !== 'Up') {
		return 'Up';
	}
	if ((key === 's' || key === 'ArrowDown') && orientation !== 'Down') {
		return 'Down';
	}
	if ((key === 'd' || key === 'ArrowRight') && orientation !== 'Right') {
		return 'Right';
	}
	if ((key === 'a' || key === 'ArrowLeft') && orientation !== 'Left') {
		return 'Left';
	}
};
