import { Direction } from '../../interfaces/Overworld';
import './PlayerCharacter.css';
export const PlayerCharacter = ({
	orientation,
	zIndex,
	sprite,
}: {
	orientation: Direction;
	zIndex: number;
	sprite: number;
}): JSX.Element => {
	return (
		<img
			className="player"
			src={`assets/playerSprites/${sprite}/${orientation}.png`}
			style={{ zIndex: zIndex }}
		/>
	); //<div className="player">{orientation}</div>;
};
