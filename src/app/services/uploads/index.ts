import { api } from '../api';
import {
  IDeleteSpeechToText,
  ICreateProjectRes,
  IHistoryRes,
  IProject,
} from './type';

export const uploadApi = api.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<ICreateProjectRes, FormData>({
      query: (body) => ({
        url: 'projects/',
        method: 'POST',
        body,
      }),
    }),

    deleteProject: build.mutation<string, IDeleteSpeechToText>({
      query: (body) => ({
        url: 'projects/' + body.id + '/',
        method: 'DELETE',
        body,
      }),
    }),
    editProjectTitle: build.mutation<string, FormData>({
      query: (body) => ({
        url: 'projects/' + body.get('id') + '/',
        method: 'PATCH',
        body,
      }),
    }),
    getProject: build.mutation<IProject, string>({
      query: (id) => ({
        url: 'projects/' + id + '/',
      }),
    }),
    getHistory: build.mutation<IHistoryRes, void>({
      query: () => ({
        url: 'projects/',
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectMutation,
  useGetHistoryMutation,
  useDeleteProjectMutation,
  useEditProjectTitleMutation,
} = uploadApi;
