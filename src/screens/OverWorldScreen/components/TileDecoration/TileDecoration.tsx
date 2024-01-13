import { Decoration } from '../../interfaces/Overworld';
import './TileDecoration.css';

export const TileDecoration = ({
	occupantOffset,
	decoration,
}: {
	occupantOffset: boolean;
	decoration?: Decoration;
}) => {
	if (decoration) {
		console.log(decoration);
	}

	if (!decoration) {
		return <></>;
	}
	return (
		<img
			className={`tileDecoration ${
				occupantOffset ? 'occupantOffset' : undefined
			}`}
			style={
				{
					'--height': `${decoration.height}`,
					'--width': decoration.width,
				} as React.CSSProperties
			}
			src={`/assets/mapObjects/${decoration?.id}.png`}
		/>
	);
};
