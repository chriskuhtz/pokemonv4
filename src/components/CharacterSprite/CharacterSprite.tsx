import { Direction } from '../../interfaces/Direction';

export const CharacterSprite = ({
	orientation,
	index,
	className,
	style,
}: {
	orientation: Direction;
	index: number;
	className?: string;
	style?: React.CSSProperties;
}) => {
	return (
		<img
			className={className}
			style={style}
			src={`assets/playerSprites/${index}/${orientation}.png`}
		/>
	);
};
