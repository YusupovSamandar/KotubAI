export interface IBtnLangList {
  label: string;
  id: string;
  Flag?: () => React.ReactNode;
  onclickFC: () => void;
}
