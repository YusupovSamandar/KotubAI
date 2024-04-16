import { api } from '../api';
import { ISpeechToTextSummary, ISpeechToTextArticle, IQuestion } from './type';

export const workSpaceActionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    sTTSummary: build.mutation<{ result: string }, ISpeechToTextSummary>({
      query: (body) => ({
        url: `/api/speech-to-text/${body.id}/summary?lang=` + body.lang,
        method: 'POST',
      }),
    }),
    sTTArticle: build.mutation<{ result: string }, ISpeechToTextArticle>({
      query: (body) => ({
        url: `/api/speech-to-text/${body.id}/article`,
        params: { type: body.type, lang: body.lang },
        method: 'POST',
      }),
    }),
    sTTTranslate: build.mutation<{ result: string }, ISpeechToTextSummary>({
      query: (body) => ({
        url: `/api/speech-to-text/${body.id}/translate`,
        params: { lang: body.lang },
        method: 'POST',
      }),
    }),
    sTTQuestion: build.mutation<{ result: string }, FormData>({
      query: (body) => ({
        url: `/api/ask-question`,
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
