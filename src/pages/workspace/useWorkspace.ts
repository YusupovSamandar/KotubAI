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
import { useTypedSelector } from 'src/app/store';
import { useState } from 'react';
import { workspaceLanguageData } from './languageData';
export default function useWorkspace() {
  const [pageContent, setPageContent] = useState<string>(' ');
  const [fileURL, setFileURL] = useState<string>(null);
  const [activeLangBtn, setActiveLangBtn] = useState<string>('en-US');
  const [activeArticleType, setActiveArticleType] = useState<string>('article');

  const lang = useTypedSelector((state) => state.language);
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
      label: workspaceLanguageData[lang].modal.article.types.article,
      id: 'article',
      onclickFC: async () => {
        setActiveArticleType('article');
      },
    },
    {
      label: workspaceLanguageData[lang].modal.article.types.news,
      id: 'news',
      onclickFC: async () => {
        setActiveArticleType('news');
      },
    },
    {
      label: workspaceLanguageData[lang].modal.article.types.reportage,
      id: 'reportage',
      onclickFC: async () => {
        setActiveArticleType('reportage');
      },
    },
    {
      label: workspaceLanguageData[lang].modal.article.types.interview,
      id: 'interwiew',
      onclickFC: async () => {
        setActiveArticleType('interwiew');
      },
    },
  ];

  const actionsList = [
    {
      Icon: FileDoneOutlined,
      label: workspaceLanguageData[lang].summarize,
      content: 'txt',
      id: 1,
      onclickFC: async (pageObj, lang) => {
        const res = await postSTTSummary({
          id: pageObj.id,
          lang: lang,
        }).unwrap();
        setPageContent(res.detail);
      },
    },
    {
      Icon: EditOutlined,
      label: workspaceLanguageData[lang].article,
      content: 'txt',
      id: 2,
      onclickFC: async (pageObj, lang, type?) => {
        const res = await postSTTArticle({
          id: pageObj.id,
          lang: lang,
          type: type,
        }).unwrap();
        setPageContent(res.detail);
      },
    },
    {
      Icon: TranslationOutlined,
      label: workspaceLanguageData[lang].translate,
      content: 'txt',
      id: 3,
      onclickFC: async (pageObj, lang) => {
        const res = await postSTTTranslate({
          id: pageObj.id,
          lang: lang,
        }).unwrap();
        setFileURL(res.detail.split('media/')[1]);
        setPageContent(null);
      },
    },
    {
      Icon: MessageOutlined,
      label: workspaceLanguageData[lang].askQuestion,
      content: 'asdsd',
      id: 4,
      onclickFC: async (pageObj, question) => {
        const FormDT = new FormData();
        FormDT.append('question', question);
        FormDT.append('id', pageObj.id);
        const res = await postSTTQuestion(FormDT).unwrap();
        setPageContent(res.detail);
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
      label: 'Русский',
      id: 'ru-RU',
      onclickFC: async () => {
        setActiveLangBtn('ru-RU');
      },
    },
    {
      label: "O'zbek",
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
    setPageContent,
  };
}
