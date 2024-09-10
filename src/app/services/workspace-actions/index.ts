import { api } from '../api';
import { ISpeechToTextSummary, ISpeechToTextArticle, IQuestion } from './type';

export const workSpaceActionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    sTTSummary: build.mutation<{ detail: string }, ISpeechToTextSummary>({
      query: (body) => ({
        url: `/speech-to-text/${body.id}/summary`,
        method: 'POST',
        body,
      }),
    }),
    sTTArticle: build.mutation<{ detail: string }, ISpeechToTextArticle>({
      query: (body) => ({
        url: `/speech-to-text/${body.id}/article`,
        method: 'POST',
        body,
      }),
    }),
    sTTTranslate: build.mutation<{ detail: string }, ISpeechToTextSummary>({
      query: (body) => ({
        url: `/speech-to-text/${body.id}/translate-document`,
        method: 'POST',
        body,
      }),
    }),
    sTTQuestion: build.mutation<{ detail: string }, FormData>({
      query: (body) => ({
        url: `/speech-to-text/${body.get('id')}/ask-question`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSTTSummaryMutation,
  useSTTArticleMutation,
  useSTTTranslateMutation,
  useSTTQuestionMutation,
} = workSpaceActionsApi;
