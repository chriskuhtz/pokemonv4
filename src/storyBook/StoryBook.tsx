import { PokemonPill } from '../components/PokemonPill/PokemonPill';
import { pokemonGenerator } from '../testing/generators/pokemonGenerator';

export const StoryBook = (): JSX.Element => {
	return (
		<div>
			<h1>Playground</h1>
			<PokemonPill pokemon={pokemonGenerator()} onClick={() => {}} />
		</div>
	);
};
