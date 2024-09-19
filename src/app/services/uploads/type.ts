//Login Types
export type actionTypes = 'stt' | 'summary' | 'article' | 'translate';
export type outputTypes = 'text' | 'docx';
export type articleTypes = 'article' | 'news' | 'interview' | 'reportage';
export interface ISpeechToText {
  name: string;
  input_text: string;
  audio_file: string;
  lang: string;
}

export interface IService {
  id: number;
  lang: 'uz-UZ' | 'en-US' | 'ru-RU';
  input_text: string | null;
  input_file: string;
  output_docx: string;
  file_name: string;
  output_text: string;
  user: number;
  type?: articleTypes;
  project: number;
}

export interface IServiceArticle extends IService {
  type: articleTypes;
}

export interface IProject {
  id: number;
  name: string;
  stt: IService;
  user: number;
  input_file: string;
  input_text: string;
  summary: IService[];
  article: IServiceArticle[];
  translate: IService[];
  action_type: actionTypes;
  output_type: outputTypes;
}

export interface ICreateProjectRes {
  id: number;
  name: string;
  input_text: string;
  output_type: string;
  action_type: string;
}

export interface speechToTextGHistory {
  result: ICreateProjectRes;
}
export interface IHistoryState {
  input_file: string;
  name: string;
  action_type: actionTypes;
  output_type: 'text' | 'docx';
  createdAt: Date;
  user: number;
  id: number;
  updatedAt: Date;
}
export interface IHistoryRes {
  results: {
    id: number;
    name: string;
  }[];
}
export interface IDeleteSpeechToText {
  id: number;
}

export interface IPatchSpeechToText {
  id: number;
  project_name: string;
}
