import { DexEntry } from '../interfaces/DexEntry';
import { Quest } from '../interfaces/Quest';

export const isOwnedPokemonQuestFulfilled = (
	quest: Quest,
	pokedex: DexEntry[]
): boolean => {
	if (quest.condition.type !== 'OWNED_POKEMON') {
		return false;
	}
	if (quest.condition.mode === 'ALL') {
		return quest.condition.ids.every((id) =>
			pokedex.some(
				(dexEntry) => dexEntry.dexId === id && dexEntry.status === 'owned'
			)
		);
	}
	if (quest.condition.mode === 'SOME') {
		return quest.condition.ids.some((id) =>
			pokedex.some(
				(dexEntry) => dexEntry.dexId === id && dexEntry.status === 'owned'
			)
		);
	}
	return false;
};
