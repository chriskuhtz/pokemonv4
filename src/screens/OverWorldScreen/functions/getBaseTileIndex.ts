import { BaseTileId, BaseTileMap } from '../interfaces/Tile';

export const getBaseTileIndex = (baseTile: BaseTileId): string => {
	const recordEntry = BaseTileMap[baseTile];

	if (!recordEntry) {
		return '1';
	}
	const randomNumber = Math.floor(Math.random() * 100);

	return (
		Object.entries(recordEntry).find((e) => e[1] >= randomNumber)?.[0] ?? '1'
	);
};
