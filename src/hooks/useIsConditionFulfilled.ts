import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';
import { getUserName } from '../functions/getUserName';
import { isOwnedPokemonQuestFulfilled } from '../functions/isOwnedPokemonQuestFulfilled';
import { Condition } from '../interfaces/Quest';

export const useIsConditionFulfilled = () => {
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);

	return useCallback(
		(condition: Condition) => {
			if (!data) {
				return false;
			}

			return isOwnedPokemonQuestFulfilled(condition, data.pokedex);
		},
		[data]
	);
};
