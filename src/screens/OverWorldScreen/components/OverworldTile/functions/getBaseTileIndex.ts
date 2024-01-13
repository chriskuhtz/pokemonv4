import { BaseTileId, BaseTileMap } from '../../../interfaces/Overworld';

export const getBaseTileIndex = (baseTile: BaseTileId) => {
	const recordEntry = BaseTileMap[baseTile];

	if (!recordEntry) {
		return 1;
	}
	const randomNumber = Math.floor(Math.random() * 100);

	return (
		Object.entries(recordEntry).find((e) => e[1] >= randomNumber)?.[0] ?? 1
	);
};
