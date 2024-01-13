import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';
import { getUserName } from '../functions/getUserName';
import { isOwnedPokemonQuestFulfilled } from '../functions/isOwnedPokemonQuestFulfilled';
import { Quest } from '../interfaces/Quest';

export const useIsQuestConditionFulfilled = (quest: Quest) => {
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);

	return useMemo(() => {
		if (!data) {
			return false;
		}

		return isOwnedPokemonQuestFulfilled(quest, data.pokedex);
	}, [data, quest]);
};
