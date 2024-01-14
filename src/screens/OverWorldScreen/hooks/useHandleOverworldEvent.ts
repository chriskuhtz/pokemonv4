import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../api/store';
import { useIsConditionFulfilled } from '../../../hooks/useIsConditionFulfilled';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { OverworldPosition } from '../../../interfaces/SaveFile';
import { addDialogue } from '../../../slices/dialogueSlice';
import { OverworldEvent } from '../interfaces/OverworldEvent';

export const useHandleOverworldEvent = (currentPosition: OverworldPosition) => {
	const navigate = useNavigate();
	const checkCondition = useIsConditionFulfilled();
	const dispatch = useAppDispatch();
	const save = useSaveGame();
	return useCallback(
		(event: OverworldEvent) => {
			if (event.condition && !checkCondition(event.condition)) {
				dispatch(
					addDialogue([
						event.condition.conditionFailMessage ?? 'Condition not fulfilled',
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
		[checkCondition, currentPosition, dispatch, navigate, save]
	);
};
