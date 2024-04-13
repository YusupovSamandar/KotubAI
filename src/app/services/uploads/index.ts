import { api } from '../api';
import { IHistory, ISpeechToTextRes } from './type';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    speechToText: build.mutation<ISpeechToTextRes, FormData>({
      query: (body) => ({
        url: 'api/speech-to-text',
        method: 'POST',
        body,
      }),
    }),
    getSpeechToText: build.mutation<ISpeechToTextRes, string>({
      query: (id) => ({
        url: 'api/speech-to-text/' + id,
      }),
    }),
    getHistory: build.mutation<IHistory, void>({
      query: (id) => ({
        url: 'api/speech-to-text/history',
      }),
    }),
  }),
});

export const {
  useSpeechToTextMutation,
  useGetSpeechToTextMutation,
  useGetHistoryMutation,
} = authApi;
