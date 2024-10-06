import { api } from '../api';
import { IService, IServiceArticle } from '../uploads/type';
import {
  ISpeechToTextSummary,
  ISpeechToTextArticle,
  IEditOutputTxt,
} from './type';

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
        body: { ...body },
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
    editStt: build.mutation<IService, IEditOutputTxt>({
      query: (body) => ({
        url: 'projects/' + body.projectId + '/speechtotext/' + body.serviceId,
        method: 'PATCH',
        body,
      }),
    }),
    // edits
    editSummary: build.mutation<IService, IEditOutputTxt>({
      query: (body) => ({
        url: 'projects/' + body.projectId + '/summary/' + body.serviceId,
        method: 'PATCH',
        body,
      }),
    }),
    editArticle: build.mutation<IService, IEditOutputTxt>({
      query: (body) => ({
        url: 'projects/' + body.projectId + '/article/' + body.serviceId,
        method: 'PATCH',
        body,
      }),
    }),
    editTranslate: build.mutation<IService, IEditOutputTxt>({
      query: (body) => ({
        url: 'projects/' + body.projectId + '/translate/' + body.serviceId,
        method: 'PATCH',
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
  useEditSttMutation,
  useEditTranslateMutation,
  useEditSummaryMutation,
  useEditArticleMutation,
} = workSpaceActionsApi;
