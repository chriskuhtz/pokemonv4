import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../api/saveFileApi';
import { UniqueOccupantId } from '../constants/UniqueOccupantRecord';
import { getUserName } from '../functions/getUserName';
import { joinInventories } from '../functions/joinInventories';
import { DexEntry } from '../interfaces/DexEntry';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { Inventory, OverworldPosition, SaveFile } from '../interfaces/SaveFile';
import { PortalEvent } from '../screens/OverWorldScreen/interfaces/OverworldEvent';

export const useSaveGame = () => {
	const userName = getUserName();
	const { data } = useGetSaveFileQuery(userName ?? skipToken);
	const [save] = usePutSaveFileMutation();

	return useCallback(
		({
			currentPosition,
			inventoryChanges,
			portalEvent,
			questUpdates,
			pokemonUpdates,
			visitedNurse,
			dexUpdates,
			handledOccupants,
			fundsUpdate,
		}: {
			currentPosition: OverworldPosition;
			inventoryChanges?: Partial<Inventory>;
			portalEvent?: PortalEvent;
			questUpdates?: SaveFile['quests'];
			pokemonUpdates?: OwnedPokemon[];
			visitedNurse?: boolean;
			dexUpdates?: DexEntry[];
			handledOccupants?: Record<UniqueOccupantId, boolean>;
			fundsUpdate?: number;
		}) => {
			if (!data) {
				return;
			}
			const updatedData = { ...data };

			const updatedInventory = inventoryChanges
				? joinInventories(data.inventory, inventoryChanges)
				: data.inventory;
			const updatedPosition = portalEvent?.to ?? currentPosition;

			let updatedPokemon = pokemonUpdates
				? data.pokemon
						.filter((d) => !pokemonUpdates?.some((u) => u.id === d.id))
						.concat(pokemonUpdates)
				: data.pokemon;

			if (visitedNurse) {
				updatedPokemon = updatedPokemon.map((p) => {
					return { ...p, damage: 0 };
				});
			}

			const updatedDex = dexUpdates
				? data.pokedex
						.filter((d) => !dexUpdates?.some((u) => u.dexId === d.dexId))
						.concat(dexUpdates)
						.sort((a, b) => a.dexId - b.dexId)
				: data.pokedex;

			void save({
				...updatedData,
				inventory: updatedInventory,
				overworldPosition: updatedPosition,
				quests: { ...data.quests, ...questUpdates },
				handledOccupants: { ...data.handledOccupants, ...handledOccupants },
				pokemon: updatedPokemon,
				pokedex: updatedDex,
				money: data.money + (fundsUpdate ?? 0),
			});
		},
		[data, save]
	);
};
