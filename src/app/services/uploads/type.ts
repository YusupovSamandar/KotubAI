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
  text_result: string;
  lang: string;
}
export interface IHistory {
  result: ISpeechToTextRes[];
}
