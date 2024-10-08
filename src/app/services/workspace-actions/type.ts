export interface ISpeechToTextSummary {
  id: number;
  lang: string;
}
export interface IQuestion {
  question: string;
}
export interface ISpeechToTextArticle {
  id: number;
  lang: string;
  type: string;
}

export interface IEditOutputTxt {
  output_text: string;
  projectId: string;
  serviceId: number;
}
