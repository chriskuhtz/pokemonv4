import { useEffect } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { SaveFile } from '../../../interfaces/SaveFile';
import { OverworldMap } from '../interfaces/Overworld';

export const useOnSaveFileLoad = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	setOrientation: (x: Direction) => void,
	handleOccupantIds: (x: string[]) => void,
	currentWorld: OverworldMap,
	saveFile?: SaveFile
) => {
	useEffect(() => {
		if (saveFile) {
			setOffsetX(saveFile.position.x);
			setOffsetY(saveFile.position.y);
			setOrientation(saveFile.orientation);
			handleOccupantIds(
				saveFile.mapProgress[currentWorld.id]?.handledOccupants ?? []
			);
		}
	}, [
		currentWorld,
		handleOccupantIds,
		saveFile,
		setOffsetX,
		setOffsetY,
		setOrientation,
	]);
};
