import { MessageOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { actionTypes, IProject } from 'src/app/services/uploads/type';
import {
  useSTTArticleMutation,
  useSTTQuestionMutation,
  useSTTSummaryMutation,
  useSTTTranslateMutation,
} from 'src/app/services/workspace-actions';
import { useTypedSelector } from 'src/app/store';
import { workspaceLanguageData } from './languageData';
import { IArticleList, IBtnLangList } from './types';
import {
  ArticleIcon,
  BritishFlag,
  RusFlag,
  SummaryIcon,
  TranslateIcon,
  UzbFlag,
} from './icons';
import useActionButtons from './useActionButtons';
interface IButtonGroup {
  Icon: any;
  label: string;
  content: string;
  id: number;
  service: Exclude<actionTypes, 'stt'> | 'question';
  onclickFC: (projectId: number, lang: string, type?: string) => void;
}

export default function useWorkspace() {
  const [data, setData] = useState<IProject | null>(null);
  const [pageContent, setPageContent] = useState<string>(' ');
  const [fileURL, setFileURL] = useState<string>(null);
  const [currentServiceId, setCurrentServiceId] = useState<number>(null);

  const [activeArticleType, setActiveArticleType] = useState<string>('article');
  const { actionsLangList, activeLangBtn } = useActionButtons();

  const lang = useTypedSelector((state) => state.language);
  const [postSTTSummary, { isLoading: isLoadingSTTSummary }] =
    useSTTSummaryMutation();
  const [postSTTArticle, { isLoading: isLoadingSTTArticle }] =
    useSTTArticleMutation();
  const [postSTTTranslate, { isLoading: isLoadingSTTTranslate }] =
    useSTTTranslateMutation();
  const [postSTTQuestion, { isLoading: isLoadingSTTQuestion }] =
    useSTTQuestionMutation();

  const articleTypes: IArticleList[] = [
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
      id: 'interview',
      onclickFC: async () => {
        setActiveArticleType('interview');
      },
    },
  ];

  const actionsList: IButtonGroup[] = [
    {
      Icon: SummaryIcon,
      label: workspaceLanguageData[lang].summarize,
      service: 'summary',
      content: 'txt',
      id: 1,
      onclickFC: async (projectId, lang) => {
        const res = await postSTTSummary({
          id: projectId,
          lang: lang,
        }).unwrap();
        setData((prev) => ({ ...prev, summary: [...prev.summary, res] }));
        setPageContent(res.output_text);
        setFileURL(res.output_docx);
        setCurrentServiceId(res.id);
      },
    },
    {
      Icon: ArticleIcon,
      label: workspaceLanguageData[lang].article,
      content: 'txt',
      service: 'article',
      id: 2,
      onclickFC: async (projectId, lang, type?) => {
        const res = await postSTTArticle({
          id: projectId,
          lang: lang,
          type: type,
        }).unwrap();
        setData((prev) => ({ ...prev, article: [...prev.article, res] }));
        setCurrentServiceId(res.id);
        setPageContent(res.output_text);
        setFileURL(res.output_docx);
      },
    },
    {
      Icon: TranslateIcon,
      label: workspaceLanguageData[lang].translate,
      content: 'txt',
      service: 'translate',
      id: 3,
      onclickFC: async (projectId, lang) => {
        const res = await postSTTTranslate({
          id: projectId,
          lang: lang,
        }).unwrap();
        setData((prev) => ({ ...prev, translate: [...prev.translate, res] }));
        // setFileURL(hostName + '/' + res.detail);
        setCurrentServiceId(res.id);
        setPageContent(res.output_text);
        setFileURL(res.output_docx);
      },
    },
    // {
    //   Icon: MessageOutlined,
    //   label: workspaceLanguageData[lang].askQuestion,
    //   content: 'asdsd',
    //   service: 'question',
    //   id: 4,
    //   onclickFC: async (projectId, question) => {
    //     const FormDT = new FormData();
    //     FormDT.append('question', question);
    //     FormDT.append('id', projectId + '');
    //     const res = await postSTTQuestion(FormDT).unwrap();
    //     setPageContent(res.output_text);
    //     setFileURL(res.output_docx);
    //   },
    // },
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
    setCurrentServiceId,
    setFileURL,
    setData,
    data,
    currentServiceId,
  };
}
