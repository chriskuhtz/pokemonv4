import { OwnedPokemon } from '../../interfaces/SaveFile';
import { PokemonListItem } from '../PokemonListItem/PokemonListItem';

export interface PokemonListProps {
	pokemon: OwnedPokemon[];
}

export const PokemonList = ({ pokemon }: PokemonListProps): JSX.Element => {
	return (
		<div>
			{pokemon.map((p) => (
				<PokemonListItem pokemon={p} />
			))}
		</div>
	);
};
