import { LanguageTypes } from 'src/app/services/uploads/type';

export interface IBtnLangList {
  label: string;
  id: LanguageTypes;
  Flag?: () => React.ReactNode;
  onclickFC: () => void;
}
