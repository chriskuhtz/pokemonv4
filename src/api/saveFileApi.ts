// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SaveFile } from '../interfaces/SaveFile';

// Define a service using a base URL and expected endpoints

export const saveFileApi = createApi({
	reducerPath: 'saveFileApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		getAllSaveFiles: builder.query<Record<string, SaveFile>, void>({
			query: () => `/db`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSaveFilesQuery } = saveFileApi;
