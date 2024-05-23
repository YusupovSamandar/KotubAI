import { DatePickerProps } from 'antd';
import { ICategoryRes } from '../classifiers/type';
import { IAccountRes, IContingentsRes } from '../management/type';
import { IBaseRes } from '../type';

///////// Cash //////////
export interface ICash {
  date: string;
  income: number;
  outcome: number;
  comment: string;
  source: number;
  account: number;
  counterparty: number;
}

export interface ICashTable extends Omit<ICash, 'date' | 'income' | 'outcome'> {
  date: DatePickerProps['value'];
  is_expense: 'true' | 'false';
  amount: number;
  category: number;
}

export interface ICashRes
  extends Omit<IBaseRes<ICash>, 'source' | 'account' | 'counterparty'> {
  source: ISourceRes;
  account: IAccountRes;
  counterparty: IContingentsRes;
  balance: number;
}

///////// Source //////////
export interface ISource {
  number: string;
  title: string;
  comment: string;
  is_expense: boolean;
  category: number;
}

export interface ISourceForm extends Omit<ISource, 'is_expense'> {
  is_expense: string;
}

export interface ISourceRes extends Omit<IBaseRes<ISource>, 'category'> {
  category: ICategoryRes;
}

export interface IGeneratePaymentClicklink {
  order_id: number;
  card_type: 'uzcard' | 'humo';
}
export interface IGeneratePaymentClicklinkRes {
  pay_link: string;
}

export interface IGenerateOrderId {
  amount: number;
  type: 'click' | 'payme';
}

export interface IGenerateOrderIdRes {
  id: number;
  amount: number;
  type: 'click' | 'payme';
}
export interface IGeneratePaymentPaymelinkRes
  extends IGeneratePaymentClicklinkRes {}
export interface IGeneratePaymentPaymelink {
  order_id: number;
}

export interface ICheckPaymentStatusRes {
  status: 'paid' | 'pending' | 'created' | 'cancel';
}
