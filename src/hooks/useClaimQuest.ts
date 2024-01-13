import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../api/saveFileApi';
import { addItemStacksToInventory } from '../functions/addItemStacksToInventory';
import { getUserName } from '../functions/getUserName';
import { Quest } from '../interfaces/Quest';

export const useClaimQuest = () => {
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);
	const [save] = usePutSaveFileMutation();

	return useCallback(
		(quest: Quest) => {
			if (!data) {
				return;
			}
			const updatedQuests = [...data.quests]
				.filter((q) => q.id !== quest.id)
				.concat({ ...quest, status: 'completed' });
			const updatedFunds = data.money + (quest.rewardMoney ?? 0);
			const updatedInventory = addItemStacksToInventory(
				data.inventory,
				quest.rewardItems ?? []
			);

			void save({
				...data,
				quests: updatedQuests,
				money: updatedFunds,
				inventory: updatedInventory,
			});
		},
		[data, save]
	);
};
