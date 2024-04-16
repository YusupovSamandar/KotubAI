import { api } from '../api';
import { IHistory, ISpeechToTextRes, speechToTextGHistory } from './type';

export const uploadApi = api.injectEndpoints({
  endpoints: (build) => ({
    speechToText: build.mutation<ISpeechToTextRes, FormData>({
      query: (body) => ({
        url: 'api/speech-to-text?lang=' + body.get('lang'),
        method: 'POST',
        body,
      }),
    }),
    getSpeechToText: build.mutation<speechToTextGHistory, string>({
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
} = uploadApi;
