import { CharacterSprite } from '../../components/CharacterSprite/CharacterSprite';

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<CharacterSprite orientation="Down" index={'001'} />
			<CharacterSprite orientation="Left" index={'004'} />
			<CharacterSprite orientation="Right" index={'103'} />
			<CharacterSprite orientation="Up" index={'058'} />
		</div>
	);
};
