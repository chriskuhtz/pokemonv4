import { useGetPokemonDataByDexIdQuery } from '../../api/pokeApi';
import { OwnedPokemon } from '../../interfaces/SaveFile';
import { ErrorPill } from '../../ui_components/ErrorPill/ErrorPill';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { Pill } from '../../ui_components/Pill/Pill';

export const PokemonListItem = ({ pokemon }: { pokemon: OwnedPokemon }) => {
	const { data, isFetching } = useGetPokemonDataByDexIdQuery(pokemon.dexId);

	if (isFetching) {
		return <FetchingPill />;
	}
	if (data) {
		return (
			<Pill
				leftSide={
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexId}.png`}
					/>
				}
				center={data?.name}
			/>
		);
	}
	return <ErrorPill />;
};
