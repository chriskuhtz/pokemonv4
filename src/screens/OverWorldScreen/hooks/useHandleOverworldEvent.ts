import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../api/store';
import { useIsConditionFulfilled } from '../../../hooks/useIsConditionFulfilled';
import { addDialogue } from '../../../slices/dialogueSlice';
import { OverworldEvent } from '../interfaces/OverworldEvent';

export const useHandleOverworldEvent = (save: () => void) => {
	const navigate = useNavigate();
	const checkCondition = useIsConditionFulfilled();
	const dispatch = useAppDispatch();
	return useCallback(
		(event: OverworldEvent) => {
			console.log(event, checkCondition(event.condition!));
			if (event.condition && !checkCondition(event.condition)) {
				dispatch(
					addDialogue([
						event.condition.conditionFailMessage ?? 'Condition not fulfilled',
					])
				);
				return;
			}
			if (event.type === 'ROUTE') {
				save();
				navigate(event.to);
			}
		},
		[checkCondition, dispatch, navigate, save]
	);
};
