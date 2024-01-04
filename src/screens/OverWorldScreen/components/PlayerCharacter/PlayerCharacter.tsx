import { CharacterSprite } from '../../../../components/CharacterSprite/CharacterSprite';
import { Direction } from '../../../../interfaces/Direction';
import { ForwardFoot } from '../../../../interfaces/ForwardFoot';
import './PlayerCharacter.css';
export const PlayerCharacter = ({
	orientation,
	zIndex,
	sprite,
	forwardFoot,
}: {
	orientation: Direction;
	zIndex: number;
	sprite: string;
	forwardFoot?: ForwardFoot;
}): JSX.Element => {
	return (
		<CharacterSprite
			className="player character"
			style={{ zIndex: zIndex }}
			orientation={orientation}
			index={sprite}
			forwardFoot={forwardFoot}
		/>
	);
};
