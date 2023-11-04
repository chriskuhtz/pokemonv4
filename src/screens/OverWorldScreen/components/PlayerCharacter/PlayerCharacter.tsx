import { Direction } from '../../interfaces/Overworld';
import './PlayerCharacter.css';
export const PlayerCharacter = ({
	orientation,
	zIndex,
}: {
	orientation: Direction;
	zIndex: number;
}): JSX.Element => {
	return (
		<img
			className="player"
			src={`assets/playerSprites/0/${orientation}.png`}
			style={{ zIndex: zIndex }}
		/>
	); //<div className="player">{orientation}</div>;
};