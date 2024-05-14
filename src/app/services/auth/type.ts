import { ICompanyRes } from '../management/type';
import { PositionAttributes } from '../type';

//Login Types
export interface ILogin {
  token: string;
  type: string;
  user_id: string;
}
export interface ILoginTelegram {
  first_name: string;
  last_name: string;
  telegram_id: number;
}
export interface ILoginRes {
  email: string;
  full_name: string;
  token: {
    access: string;
    refresh: string;
  };
}
export interface ILoginTelegramRes {
  tokens: {
    access: string;
    refresh: string;
  };
}

//Confirm Types
export interface IConfirm {
  phone: string;
  code: number;
}
export interface IConfirmRes {
  profile: IProfile;
  tokens: {
    refresh: string;
    access: string;
  };
}

//Profile Types
export interface IProfile {
  first_name: string;
  last_name: string;
  lang: string;
  credit_sums: string;
  credit_seconds: string;
  used_sums: string;
  used_seconds: string;
}

//Verify Types
export interface IVerify {
  token: string;
}
