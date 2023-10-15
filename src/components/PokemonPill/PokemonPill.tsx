import { Pokemon } from '../../interfaces/Pokemon';

export const PokemonPill = ({
	pokemon,
	onClick,
}: {
	pokemon: Pokemon;
	onClick: () => void;
}): JSX.Element => {
	return <div onClick={onClick}>{pokemon.name}</div>;
};
