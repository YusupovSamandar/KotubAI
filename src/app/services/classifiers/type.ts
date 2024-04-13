import { IBaseNameRes } from '../type';

export interface IRegion extends IBaseNameRes {}

export interface IDistrict extends IBaseNameRes {
  region: number;
}

export interface ICategory {
  title: string;
}

export interface ICategoryRes extends ICategory {
  id: number;
  creared_at: string;
  updated_ad: string;
}
