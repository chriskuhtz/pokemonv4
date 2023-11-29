// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SaveFile } from '../interfaces/SaveFile';

// Define a service using a base URL and expected endpoints

export const saveFileApi = createApi({
	reducerPath: 'saveFileApi',
	tagTypes: ['saveFile'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		getAllSaveFiles: builder.query<Record<string, SaveFile>, void>({
			query: () => `/db`,
			providesTags: ['saveFile'],
		}),
		getSaveFile: builder.query<SaveFile, string>({
			query: (username: string) => `/${username}`,
			providesTags: ['saveFile'],
		}),
		putSaveFile: builder.mutation<SaveFile, SaveFile>({
			query: (newSaveFile) => ({
				url: `/${newSaveFile.username}`,
				method: 'PUT',
				body: newSaveFile,
			}),
			invalidatesTags: ['saveFile'],
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetAllSaveFilesQuery,
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} = saveFileApi;
