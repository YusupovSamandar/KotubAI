//Login Types
export interface ISpeechToText {
  name: string;
  youtube_link: string;
  audio_file: string;
  lang: string;
}

export interface ISpeechToTextRes {
  id: number;
  project_name: string;
  youtube_link: string;
  input_file: string;
  result_docx: string;
  file_size: string;
  file_name: string;
  result_text: string;
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
  results: IHistoryState[];
}
export interface IDeleteSpeechToText {
  id: number;
}

export interface IPatchSpeechToText {
  id: number;
  project_name: string;
}
