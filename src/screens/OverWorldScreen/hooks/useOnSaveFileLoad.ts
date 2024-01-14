import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsConditionFulfilled } from '../../../hooks/useIsConditionFulfilled';
import { Direction } from '../../../interfaces/Direction';
import { SaveFile } from '../../../interfaces/SaveFile';
import { RoutesEnum } from '../../../router/router';
import { OverworldMap } from '../interfaces/Overworld';

export const useOnSaveFileLoad = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	setOrientation: (x: Direction) => void,
	handleOccupantIds: (x: string[]) => void,
	currentWorld: OverworldMap,
	saveFile?: SaveFile
) => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const navigate = useNavigate();
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

	useEffect(() => {
		if (!saveFile) {
			return;
		}
		const unclaimedQuest = saveFile.quests.find(
			(q) => q.status === 'active' && isConditionFulfilled(q.condition)
		);
		console.log(unclaimedQuest);
		if (unclaimedQuest) {
			navigate(RoutesEnum.newFulfilledQuest);
		}
	}, [isConditionFulfilled, navigate, saveFile]);
};
