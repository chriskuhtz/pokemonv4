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
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => {
					const parsedId = `00${x}`;
					return (
						<Pill
							key={x}
							onClick={() =>
								setNewSaveFile({ ...newSaveFile, sprite: parsedId })
							}
							selected={newSaveFile.sprite === parsedId}
							center={
								<CharacterSprite
									orientation={currentOrientation}
									index={parsedId}
									style={
										{
											'--size': '40px',
											marginRight: '-20px',
										} as React.CSSProperties
									}
								/>
							}
						/>
					);
				})}
			</div>
		</>
	);
};
