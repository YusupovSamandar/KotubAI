import { api } from '../api';
import { IService, IServiceArticle } from '../uploads/type';
import { ISpeechToTextSummary, ISpeechToTextArticle } from './type';

export const workSpaceActionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    sTTSummary: build.mutation<IService, ISpeechToTextSummary>({
      query: (body) => ({
        url: `/projects/${body.id}/summary/`,
        method: 'POST',
        body,
      }),
    }),
    sTTArticle: build.mutation<IServiceArticle, ISpeechToTextArticle>({
      query: (body) => ({
        url: `/projects/${body.id}/article/`,
        method: 'POST',
        body,
      }),
    }),
    sTTTranslate: build.mutation<IService, ISpeechToTextSummary>({
      query: (body) => ({
        url: `/projects/${body.id}/translate/`,
        method: 'POST',
        body,
      }),
    }),
    sTTQuestion: build.mutation<IService, FormData>({
      query: (body) => ({
        url: `/projects/${body.get('id')}/ask-question/`,
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
