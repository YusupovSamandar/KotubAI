import { DatePickerProps } from 'antd';
import { IProductRes, IStoreRes } from '../commerce/type';
import { IBaseRes } from '../type';

///////// Company //////////
export interface ICompany {
  title: string;
}
export interface ICompanyRes extends IBaseRes<ICompany> {
  id: number;
}

///////////// Account ////////////
export interface IAccount {
  title: string;
  initial_balance: number;
  comment: string;
  is_main: boolean;
}
export interface IAccountRes extends IBaseRes<IAccount> {
  balance: number;
}

////////////// Contingents ////////////////////
export interface IContingents {
  number: string;
  inn: string;
  swift: string;
  ifut: string;
  bank: string;
  mfo: string;
  okonx: string;
  account: string;
  first_name: string;
  last_name: string;
  balance: number;
  type: string;
  store: number;
  comment: string;
}

export interface IContingentsRes extends IBaseRes<Omit<IContingents, 'store'>> {
  store: IStoreRes;
  product_summary: IProductSummary[];
}

export interface IProductSummary {
  name: string;
  total_amount: number;
  total_paid_amount: number;
  total_quantity: number;
}

/////////////////// Contingent Detail /////////////////

export type IContingentDetailType = 'sale' | 'payment';

export interface IContingentDetail {
  number: string;
  date: string;
  quantity: number;
  sum?: number;
  comment: string;
  type: IContingentDetailType;
  product?: number;
  inn: number;
  bank_cost?: number;
}
export interface IContingentDetailTable
  extends Omit<IContingentDetail, 'date'> {
  date: DatePickerProps['value'];
}

export interface IContingentDetailRes
  extends Omit<IBaseRes<IContingentDetail>, 'product' | 'key'> {
  balance: number;
  product: IProductRes;
  key: string;
}

///////////// Employee //////////////
export interface IEmployee {
  first_name: string;
  phone: string;
  position: string;
  store: number;
  comment: string;
  hired_date: string;
}

export interface IEmployeeForm extends Omit<IEmployee, 'hired_date'> {
  hired_date: DatePickerProps['value'];
}

export interface IEmployeeRes extends Omit<IEmployee, 'store'> {
  id: number;
  store: IStoreRes;
}

///////////// Salary //////////////
export interface ISalary {
  date: string;
  start_month_owe_us: number;
  start_month_we_owe: number;
  total_income: number;
  income_tax: number;
  pension_tax: number;
  cash: number;
  plastic: number;
  property_tax: number;
  other_deductions: number;
  total_deductions: number;
  net_salary: number;
  end_month_owe_us: number;
  end_month_we_owe: number;
  year_start_balance: number;
  employees: number[];
}

export interface ISalaryForm extends Omit<ISalary, 'date'> {
  date: DatePickerProps['value'];
}

export interface ISalaryRes extends Omit<IBaseRes<ISalary>, 'employees'> {
  employees: IEmployeeRes[];
}
