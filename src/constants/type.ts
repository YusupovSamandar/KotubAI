import type { ColumnsType } from 'antd/es/table/interface';
export type IColumn<T> = ColumnsType<T>;

export interface IOption {
  label: string;
  value: number;
}

export interface IMonthData<TData> {
  1: TData;
  2: TData;
  3: TData;
  4: TData;
  5: TData;
  6: TData;
  7: TData;
  8: TData;
  9: TData;
  10: TData;
  11: TData;
  12: TData;
}

export type UserInputOptions =
  | 'audio_video'
  | 'yt_link'
  | 'text'
  | 'docx'
  | 'site_link';
