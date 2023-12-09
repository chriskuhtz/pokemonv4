import { CharacterSprite } from '../../../../components/CharacterSprite/CharacterSprite';
import { Direction } from '../../../../interfaces/Direction';
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
		<CharacterSprite
			className="player character"
			style={{ zIndex: zIndex }}
			orientation={orientation}
			index={sprite}
		/>
	); //<div className="player">{orientation}</div>;
};
