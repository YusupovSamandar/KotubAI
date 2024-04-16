//Login Types
export interface ISpeechToText {
  name: string;
  youtube_link: string;
  audio_file: string;
  lang: string;
}

export interface ISpeechToTextRes {
  id: number;
  user: number;
  name: string;
  youtube_link: string;
  audio_file: string;
  result_docx: string;
  lang: string;
}

export interface speechToTextGHistory {
  result: ISpeechToTextRes;
}
export interface IHistoryState {
  input_file: string;
  project_name: string;
  lang: string;
  status: string;
  createdAt: Date;
  youtube_link: string;
  result_docx: string;
  user_id: number;
  id: number;
  updatedAt: Date;
}
export interface IHistory {
  result: IHistoryState[];
}
