import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';
import { useAppDispatch } from '../api/store';
import { getUserName } from '../functions/getUserName';
import { QuestCheck } from '../screens/OverWorldScreen/interfaces/Occupant';
import { initiateQuestDialogue } from '../slices/dialogueSlice';

export const useIsQuestCompleted = () => {
	const dispatch = useAppDispatch();
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? skipToken);

	return useCallback(
		(x: QuestCheck) => {
			if (!saveFile) {
				return false;
			}
			if (
				!saveFile.quests.some(
					(q) => q.id === x.questId && q.status === 'completed'
				)
			) {
				dispatch(initiateQuestDialogue(x.questId));
				return false;
			}
			return true;
		},
		[dispatch, saveFile]
	);
};
