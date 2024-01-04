import { useMemo } from 'react';
import { Direction } from '../../interfaces/Direction';

export const CharacterSprite = ({
	orientation,
	index,
	className,
	style,
}: {
	orientation: Direction;
	index: string;
	className?: string;
	style?: React.CSSProperties;
}) => {
	const orientationOffset = useMemo(() => {
		if (orientation === 'Up') {
			return 64;
		}
		if (orientation === 'Right') {
			return 128;
		}
		if (orientation === 'Left') {
			return 192;
		}
		return 0;
	}, [orientation]);

	return (
		<div
			className={className}
			style={{
				...style,
				height: '64px',
				width: '64px',
				background: `url(assets/npcs/NPC_${index}.png) 0px ${orientationOffset}px`,
			}}
		></div>
	);
};
