import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonListItem } from '../PokemonListItem/PokemonListItem';
import './TeamGrid.css';
export interface TeamGridProps {
	pokemon: OwnedPokemon[];
}

export const TeamGrid = ({ pokemon }: TeamGridProps): JSX.Element => {
	return (
		<div className="pokemonList">
			{pokemon.map((p) => (
				<PokemonListItem pokemon={p} />
			))}
		</div>
	);
};
