import { Direction } from '../../../interfaces/Direction';
import { SaveFile } from '../../../interfaces/SaveFile';

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
			<h4>What do you look like</h4>
			{Array.from({ length: 11 }).map((x, i) => (
				<button
					key={i}
					onClick={() => setNewSaveFile({ ...newSaveFile, sprite: i })}
					style={{
						border: newSaveFile.sprite === i ? '1px solid red' : undefined,
					}}
				>
					<img src={`assets/playerSprites/${i}/${currentOrientation}.png`} />
				</button>
			))}
		</>
	);
};
