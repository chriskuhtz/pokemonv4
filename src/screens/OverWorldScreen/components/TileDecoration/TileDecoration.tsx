import './TileDecoration.css';

export const TileDecoration = ({
	occupantOffset,
}: {
	occupantOffset: boolean;
}) => {
	return (
		<img
			className={`tileDecoration ${
				occupantOffset ? 'occupantOffset' : undefined
			}`}
			src={`/assets/mapObjects/tallGrass.png`}
		/>
	);
};
