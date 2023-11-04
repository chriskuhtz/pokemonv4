import { Direction } from '../../interfaces/Overworld';
import './OverworldCharacter.css';
export const OverworldCharacter = ({
	orientation,
	sprite,
	zIndex,
}: {
	sprite: number;
	orientation: Direction;
	zIndex: number;
}): JSX.Element => {
	return (
		<img
			className="overworldCharacter"
			style={{ zIndex: zIndex }}
			src={`assets/playerSprites/${sprite}/${orientation}.png`}
		/>
	);
};
