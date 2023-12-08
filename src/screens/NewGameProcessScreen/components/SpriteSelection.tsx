import { CharacterSprite } from '../../../components/CharacterSprite/CharacterSprite';
import { Direction } from '../../../interfaces/Direction';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Pill } from '../../../ui_components/Pill/Pill';
import './SpriteSelection.css';
export const SpriteSelection = ({
	newSaveFile,
	setNewSaveFile,
	currentOrientation,
}: {
	newSaveFile: Partial<SaveFile>;
	setNewSaveFile: (x: Partial<SaveFile>) => void;
	currentOrientation: Direction;
}) => {
	return (
		<>
			<h3>What do you look like</h3>
			<div className="SpriteSelection_spriteList">
				{Array.from({ length: 11 }).map((x, i) => (
					<Pill
						key={i}
						onClick={() => setNewSaveFile({ ...newSaveFile, sprite: i })}
						selected={newSaveFile.sprite === i}
						center={
							<CharacterSprite orientation={currentOrientation} index={i} />
						}
					/>
				))}
			</div>
		</>
	);
};
