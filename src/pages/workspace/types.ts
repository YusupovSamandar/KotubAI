import { articleTypes, LanguageTypes } from 'src/app/services/uploads/type';

export interface IBtnLangList {
  label: string;
  id: LanguageTypes;
  Flag?: () => React.ReactNode;
  onclickFC: () => void;
}
export interface IArticleList {
  label: string;
  id: articleTypes;
  Flag?: () => React.ReactNode;
  onclickFC: () => void;
}
