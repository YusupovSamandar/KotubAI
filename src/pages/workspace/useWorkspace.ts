import {
  useSTTSummaryMutation,
  useSTTArticleMutation,
  useSTTTranslateMutation,
  useSTTQuestionMutation,
} from 'src/app/services/workspace-actions';
import {
  EditOutlined,
  FileDoneOutlined,
  MessageOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { IBtnLangList } from './types';
import { useState } from 'react';
export default function useWorkspace() {
  const [pageContent, setPageContent] = useState<string>(' ');
  const [fileURL, setFileURL] = useState<string>(null);
  const [activeLangBtn, setActiveLangBtn] = useState<string>('en-US');
  const [activeArticleType, setActiveArticleType] = useState<string>('article');

  const [postSTTSummary, { isLoading: isLoadingSTTSummary }] =
    useSTTSummaryMutation();
  const [postSTTArticle, { isLoading: isLoadingSTTArticle }] =
    useSTTArticleMutation();
  const [postSTTTranslate, { isLoading: isLoadingSTTTranslate }] =
    useSTTTranslateMutation();
  const [postSTTQuestion, { isLoading: isLoadingSTTQuestion }] =
    useSTTQuestionMutation();

  const articleTypes: IBtnLangList[] = [
    {
      label: 'Article',
      id: 'article',
      onclickFC: async () => {
        setActiveArticleType('article');
      },
    },
    {
      label: 'News',
      id: 'news',
      onclickFC: async () => {
        setActiveArticleType('news');
      },
    },
    {
      label: 'Reportage',
      id: 'reportage',
      onclickFC: async () => {
        setActiveArticleType('reportage');
      },
    },
    {
      label: 'Interview',
      id: 'interwiew',
      onclickFC: async () => {
        setActiveArticleType('interwiew');
      },
    },
  ];

  const actionsList = [
    {
      Icon: FileDoneOutlined,
      label: 'summarize',
      content: 'txt',
      id: 1,
      onclickFC: async (pageObj, lang) => {
        const res = await postSTTSummary({
          id: pageObj.id,
          lang: lang,
        }).unwrap();
        setPageContent(res.result);
      },
    },
    {
      Icon: EditOutlined,
      label: 'Create Article',
      content: 'txt',
      id: 2,
      onclickFC: async (pageObj, lang, type?) => {
        const res = await postSTTArticle({
          id: pageObj.id,
          lang: lang,
          type: type,
        }).unwrap();
        setPageContent(res.result);
      },
    },
    {
      Icon: TranslationOutlined,
      label: 'Translate',
      content: 'txt',
      id: 3,
      onclickFC: async (pageObj, lang) => {
        const res = await postSTTTranslate({
          id: pageObj.id,
          lang: lang,
        }).unwrap();
        setFileURL(res.result.split('media/')[1]);
        setPageContent(null);
      },
    },
    {
      Icon: MessageOutlined,
      label: 'Ask Question',
      content: 'asdsd',
      id: 4,
      onclickFC: async (pageObj, question) => {
        const FormDT = new FormData();
        FormDT.append('question', question);
        const res = await postSTTQuestion(FormDT).unwrap();
        setPageContent(res.result);
      },
    },
  ];
  const actionsLangList: IBtnLangList[] = [
    {
      label: 'English',
      id: 'en-US',
      onclickFC: async () => {
        setActiveLangBtn('en-US');
      },
    },
    {
      label: 'Russian',
      id: 'ru-RU',
      onclickFC: async () => {
        setActiveLangBtn('ru-RU');
      },
    },
    {
      label: 'Uzbek',
      id: 'uz-UZ',
      onclickFC: async () => {
        setActiveLangBtn('uz-UZ');
      },
    },
  ];
  return {
    pageContent,
    actionsList,
    actionsLangList,
    activeLangBtn,
    articleTypes,
    activeArticleType,
    fileURL,
    isLoadingSTTTranslate,
  };
}
