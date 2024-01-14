import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsConditionFulfilled } from '../../../hooks/useIsConditionFulfilled';
import { Direction } from '../../../interfaces/Direction';
import { QuestRecord, QuestsEnum } from '../../../interfaces/Quest';
import { SaveFile } from '../../../interfaces/SaveFile';
import { RoutesEnum } from '../../../router/router';
import { OverworldMap } from '../interfaces/Overworld';

export const useOnSaveFileLoad = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	setOrientation: (x: Direction) => void,
	currentWorld: OverworldMap,
	saveFile?: SaveFile
) => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const navigate = useNavigate();
	useEffect(() => {
		if (saveFile) {
			setOffsetX(saveFile.overworldPosition.position.x);
			setOffsetY(saveFile.overworldPosition.position.y);
			setOrientation(saveFile.overworldPosition.orientation);
		}
	}, [currentWorld, saveFile, setOffsetX, setOffsetY, setOrientation]);

	useEffect(() => {
		if (!saveFile) {
			return;
		}
		const unclaimedQuest = Object.entries(saveFile.quests).find(
			(questEntry) => {
				const [id, status] = questEntry;
				if (id in QuestsEnum) {
					const quest = QuestRecord[id as QuestsEnum];
					return status === 'active' && isConditionFulfilled(quest.condition);
				}
			}
		);

		if (unclaimedQuest) {
			navigate(RoutesEnum.newFulfilledQuest);
		}
	}, [isConditionFulfilled, navigate, saveFile]);
};
