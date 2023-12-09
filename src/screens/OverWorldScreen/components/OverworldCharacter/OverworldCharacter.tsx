import { CharacterSprite } from '../../../../components/CharacterSprite/CharacterSprite';
import { Direction } from '../../../../interfaces/Direction';
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
		<CharacterSprite
			className="overworldCharacter character"
			style={{ zIndex: zIndex }}
			orientation={orientation}
			index={sprite}
		/>
	);
};
