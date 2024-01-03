import { OwnedPokemon } from '../../interfaces/SaveFile';

export interface PokemonListProps {
	pokemon: OwnedPokemon[];
}

export const PokemonList = ({ pokemon }: PokemonListProps): JSX.Element => {
	return (
		<div>
			{pokemon.map((p) => (
				<h1>{p.id}</h1>
			))}
		</div>
	);
};
