export type IBaseRes<TData> = TData & {
  id: number;
  is_archived?: string;
  created_at?: string;
  updated_at?: string;
  key?: number;
};

export type IBaseNameRes<TData = {}> = TData & {
  id: number;
  name_uz: string;
  name_oz: string;
  name_ru: string;
};

export interface IBaseEdit<TData> {
  id: IBaseRes<TData>['id'];
  body: Partial<TData>;
  id2?: number;
  method?: 'PUT' | 'PATCH';
}

export interface IBaseDelete {
  id: number;
  id2?: number;
}

export interface IBaseDataRes<TData> {
  count: number;
  next: string;
  previous: string;
  results: TData[];
}

export interface IBaseDeleteRes {
  id: number;
  success?: boolean;
}

export type PositionAttributes = 'user' | 'ceo';
export type CurrencyAttributes = 'usd' | 'uzs';
