import { useEffect } from 'react';
import { Direction } from '../../../interfaces/Direction';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Occupant, OverworldMap } from '../interfaces/Overworld';

export const useOnSaveFileLoad = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	setOrientation: (x: Direction) => void,
	setHandledTrainers: (x: string[]) => void,
	setOccupants: (x: (x: Occupant[]) => Occupant[]) => void,
	currentWorld: OverworldMap,
	saveFile?: SaveFile
) => {
	useEffect(() => {
		if (saveFile) {
			setOffsetX(saveFile.position.x);
			setOffsetY(saveFile.position.y);
			setOrientation(saveFile.orientation);
			setHandledTrainers(
				saveFile.mapProgress[currentWorld.id]?.handledTrainers ?? []
			);
			setOccupants((occupants: Occupant[]): Occupant[] => {
				return occupants.map((o) => {
					if (!o.watching) {
						return o;
					} else
						return {
							...o,
							watching: !(
								saveFile.mapProgress[currentWorld.id]?.handledTrainers ?? []
							).some((h) => h === o.id),
						};
				});
			});
		}
	}, [
		currentWorld,
		saveFile,
		setHandledTrainers,
		setOccupants,
		setOffsetX,
		setOffsetY,
		setOrientation,
	]);
};
