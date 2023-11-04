import { Direction } from '../../interfaces/Overworld';
import './PlayerCharacter.css';
export const PlayerCharacter = ({
	orientation,
}: {
	orientation: Direction;
}): JSX.Element => {
	return (
		<img className="player" src={`assets/playerSprites/0/${orientation}.png`} />
	); //<div className="player">{orientation}</div>;
};
