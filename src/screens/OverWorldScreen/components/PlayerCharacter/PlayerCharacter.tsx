import { CharacterSprite } from '../../../../components/CharacterSprite/CharacterSprite';
import { Direction } from '../../../../interfaces/Direction';
import './PlayerCharacter.css';
export const PlayerCharacter = ({
	orientation,
	zIndex,
	sprite,
	walking,
}: {
	orientation: Direction;
	zIndex: number;
	sprite: string;
	walking: boolean;
}): JSX.Element => {
	return (
		<CharacterSprite
			className="player character"
			style={{ zIndex: zIndex }}
			orientation={orientation}
			index={sprite}
			walking={walking}
		/>
	); //<div className="player">{orientation}</div>;
};
