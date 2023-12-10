import { useEffect } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { SaveFile } from '../../../interfaces/SaveFile';
import { OverworldMap } from '../interfaces/Overworld';

export const useOnSaveFileLoad = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	setOrientation: (x: Direction) => void,
	handleOccupants: (x: string[]) => void,
	currentWorld: OverworldMap,
	saveFile?: SaveFile
) => {
	useEffect(() => {
		if (saveFile) {
			setOffsetX(saveFile.position.x);
			setOffsetY(saveFile.position.y);
			setOrientation(saveFile.orientation);
			handleOccupants(
				saveFile.mapProgress[currentWorld.id]?.handledTrainers ?? []
			);
		}
	}, [
		currentWorld,
		handleOccupants,
		saveFile,
		setOffsetX,
		setOffsetY,
		setOrientation,
	]);
};
