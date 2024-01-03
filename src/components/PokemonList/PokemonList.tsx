import { OwnedPokemon } from '../../interfaces/SaveFile';
import { PokemonListItem } from '../PokemonListItem/PokemonListItem';
import './PokemonList.css';
export interface PokemonListProps {
	pokemon: OwnedPokemon[];
}

export const PokemonList = ({ pokemon }: PokemonListProps): JSX.Element => {
	return (
		<div className="pokemonList">
			{pokemon.map((p) => (
				<PokemonListItem pokemon={p} />
			))}
		</div>
	);
};
