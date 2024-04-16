import { api } from '../api';
import {
  IHistory,
  ISpeechToTextRes,
  speechToTextGHistory,
  IDeleteSpeechToText,
  IPatchSpeechToText,
} from './type';

export const uploadApi = api.injectEndpoints({
  endpoints: (build) => ({
    speechToText: build.mutation<ISpeechToTextRes, FormData>({
      query: (body) => ({
        url: 'api/speech-to-text?lang=' + body.get('lang'),
        method: 'POST',
        body,
      }),
    }),
    deleteSpeechToText: build.mutation<string, IDeleteSpeechToText>({
      query: (body) => ({
        url: '/api/speech-to-text/' + body.id,
        method: 'DELETE',
        body,
      }),
    }),
    editSpeechToTextTitle: build.mutation<string, FormData>({
      query: (body) => ({
        url: '/api/speech-to-text/' + body.get('id'),
        method: 'PATCH',
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
  useDeleteSpeechToTextMutation,
  useEditSpeechToTextTitleMutation,
} = uploadApi;
