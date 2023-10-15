import { Pokemon } from '../../interfaces/Pokemon';
import { TRAINERID } from '../constants/trainerIds';

export const pokemonGenerator = (data?: Partial<Pokemon>): Pokemon => {
	return { name: 'pikachu', ownerId: TRAINERID, ...data };
};
