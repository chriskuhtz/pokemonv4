import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';
import { getUserName } from '../functions/getUserName';
import { Quest } from '../interfaces/Quest';

export const useIsQuestConditionFulfilled = (quest: Quest) => {
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);

	return useMemo(() => {
		console.log(quest, data);
		if (!data) {
			return false;
		}
		if (quest.condition.type === 'OWNED_POKEMON') {
			if (quest.condition.mode === 'ALL') {
				return quest.condition.ids.every((id) =>
					data.pokedex.some(
						(dexEntry) => dexEntry.dexId === id && dexEntry.status === 'owned'
					)
				);
			}
			if (quest.condition.mode === 'SOME') {
				return quest.condition.ids.some((id) =>
					data.pokedex.some(
						(dexEntry) => dexEntry.dexId === id && dexEntry.status === 'owned'
					)
				);
			}
		}

		return false;
	}, [data, quest]);
};
