import { Pokemon } from '../../interfaces/Pokemon';
import './pokemonPill.css';
export const PokemonPill = ({
	pokemon,
	onClick,
}: {
	pokemon: Pokemon;
	onClick: () => void;
}): JSX.Element => {
	return (
		<div className="pokemonPill" onClick={onClick}>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexId}.png`}
			/>
			<div>{pokemon.name}</div>
		</div>
	);
};
