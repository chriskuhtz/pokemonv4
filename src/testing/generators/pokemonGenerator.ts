import { Pokemon } from '../../interfaces/Pokemon';
import { TRAINERID } from '../constants/trainerIds';

export const pokemonGenerator = (data?: Partial<Pokemon>): Pokemon => {
	return {
		hp: { current: 20, max: 20 },
		dexId: '25',
		name: 'pikachu',
		ownerId: TRAINERID,
		...data,
	};
};
