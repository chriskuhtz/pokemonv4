import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { useAppDispatch } from '../../../api/store';
import { checkQuestCondition } from '../../../functions/checkQuestCondition';
import { getUserName } from '../../../functions/getUserName';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { addDialogue } from '../../../slices/dialogueSlice';
import { OverworldEvent } from '../interfaces/OverworldEvent';

export const useHandleOverworldEvent = (currentPosition: OverworldPosition) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const save = useSaveGame();
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);
	return useCallback(
		(event: OverworldEvent) => {
			if (
				data &&
				event.questCondition &&
				!checkQuestCondition(data.quests, event.questCondition)
			) {
				dispatch(
					addDialogue([
						...(event.conditionFailMessage ?? 'Condition not fulfilled'),
					])
				);
				return;
			}
			if (event.type === 'ROUTE') {
				save({ currentPosition });
				navigate(event.to);
			}
			if (event.type === 'PORTAL') {
				save({ currentPosition, portalEvent: event });
			}
		},
		[currentPosition, data, dispatch, navigate, save]
	);
};
