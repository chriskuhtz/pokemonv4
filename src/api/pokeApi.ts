// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonData } from '../shared/interfaces/PokemonData';

// Define a service using a base URL and expected endpoints

export const pokeApi = createApi({
	reducerPath: 'pokeApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
	endpoints: (builder) => ({
		getPokemonDataByDexId: builder.query<PokemonData, number>({
			query: (dexId: number) => `/pokemon/${dexId}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonDataByDexIdQuery } = pokeApi;
