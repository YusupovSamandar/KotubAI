import { IBaseRes } from './type';

///////////////////////////// Source /////////////////////////////

export interface ISource {
  title: string;
  comment: string;
  is_static: boolean;
  is_expense: boolean;
  account_id: number;
  category_id: number;
  company_id: number;
}

export interface ISourceRes
  extends Omit<IBaseRes<ISource>, 'account_id' | 'category_id' | 'company_id'> {
  account: IAccountRes;
  category: ICategoryRes;
  company: ICompanyRes;
}

///////////////////////////// Account /////////////////////////////
export interface IAccount {
  title: string;
  balance: number;
  initial_balance: number;
  company_id: number;
}
export interface IAccountRes extends Omit<IBaseRes<IAccount>, 'company_id'> {
  company: ICompanyRes;
}

///////////////////////////// Category /////////////////////////////
export interface ICategory {
  title: string;
}
export interface ICategoryRes extends IBaseRes<ICategory> {}

///////////////////////////// Company /////////////////////////////
export interface ICompany {
  title: string;
  owner_id: number;
}
export interface ICompanyRes extends Omit<IBaseRes<ICompany>, 'owner_id'> {
  owner: IUserRes
}

///////////////////////////// Users /////////////////////////////

export interface IUser {
  password: string;
  last_login: string;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  avatar: string;
  phone: string;
  position: string;
  email: string;
}

export interface IUserRes extends IBaseRes<IUser> {}

///////////////////////////// Currency /////////////////////////////

export interface ICurrency {
id: number;
currency: string;
exchange_rate: string;
date: string;
}
export interface ICurrencyRes extends ICurrency {}

///////////////////////////// Lots /////////////////////////////

export interface ILot {
  name: string;
  date: string;
  comment: string;
  price: number;
  cost: number;
  company_id: number;
  }
  export interface ILotRes extends Omit<IBaseRes<ILot>, 'company_id'> {
    company: ICompanyRes
  }

///////////////////////////// Lot Production /////////////////////////////

export interface ILotProduction{
  price: number;
  quantity: number;
  product_id: number;
  provider_id: number;   //should been written
}

export interface ILotProductionRes extends Omit<IBaseRes<ILotProduction>, 'product_id'> {
  // later
}

///////////////////////////// Category /////////////////////////////

export interface ICategory {
  title: string;
  }
  export interface ICategoryRes extends IBaseRes<ICategory> {}

    ///////////////////////////// Direction /////////////////////////////

export interface IDirection {
  title: string;
  company_id: number;
  }
  export interface IDirectionRes extends Omit<IBaseRes<IDirection>, 'company_id'> {
    company: ICompanyRes
  }

  ///////////////////////////// Buildings /////////////////////////////

export interface IBuildings {
  name: string;
  date: string;
  price: number;
  amortiozation_percentage: number;
  company_id: number;
  }
  export interface IBuildingsRes extends Omit<IBaseRes<IBuildings>, 'company_id'> {
    company: ICompanyRes
  }

  ///////////////////////////// Regions /////////////////////////////

  export interface IRegions {
    name_uz: string;
    name_oz: string;
    name_ru: string;
    id: number;
    }

    export interface IRegionsRes {
    }

///////////////////////////// Districts /////////////////////////////

export interface IDistricts {
  name_uz: string;
  name_oz: string;
  name_ru: string;
  region_id: number;
  id: number;
  }

  export interface IDistrictsRes extends Omit<IDistricts, "region_id"> {
    region: IRegionsRes
  }

///////////////////////////// Rolls /////////////////////////////

export interface IRolls {
  name: string;
  date: string;
  comment: string;
  company_id: number;
  }
  
  export interface IRollsRes extends Omit<IRolls, 'company_id'> {
    company: ICompanyRes
  }

  ///////////////////////////// Stores /////////////////////////////

export interface IStores {
  name: string;
  is_main: string;
  company_id: number;
  region_id: number;
  }
  
  export interface IStoresRes extends Omit<IStores, 'company_id' | 'region_id'> {
    company: ICompanyRes
    region: IRegionsRes
  }


///////////////////////////// StoreTransactions /////////////////////////////
export interface IStoreTransactions {
  quantity: number;
  unit: string;
  comment: string;
  from_store_id: number;
  to_store_id: number;
  }
    
  export interface IStoreTransactionsRes {}

///////////////////////////// Production /////////////////////////////
export interface IProduction {
  entry_date: string;
  release_date: string;
  pateria: number;
  unit: string;
  roll_id: number;
  }
    
  export interface IProductionRes extends Omit<IBaseRes<IProduction>, 'roll_id'> {
    roll: IRollsRes
  }

///////////////////////////// Contingents /////////////////////////////
export interface IContingents {
  id: number;
  inn: string;
  first_name: string;
  last_name: string;
  balance: number;
  is_customer: boolean;
  is_suplier: boolean;
  number: number; ////added
  regionAdded: string; ////added
  city: string; ////added
  store: string; ////added 
  prevState: null ////added
  company_id: number;
  district_id: number;
  region_id: number;
  }
    
  export interface IContingentsRes extends Omit<IContingents, 'company_id' | 'district_id' | 'region_id'> {
    company: ICompanyRes
    district: IDistrictsRes
    region: IRegionsRes
  }

///////////////////////////// TMZ ///////////////////////////////

export interface ITmz {
  name: string;
  price: number;
  quatity: number;
  unit: string;
  store_id: number;
}

export interface ITmzRes extends Omit<IBaseRes<ITmz>, 'store_id'> {
  store: IStoresRes
}

///////////////////////////// RAW MATERIALS //////////////////////////////

export interface IRawMaterial {
  name: string;
  price: number;
  quantity: number;
  unit: string;
  store_id: number;
}

export interface IRawMaterialRes extends Omit<IBaseRes<IRawMaterial>, 'store_id'> {
  store: IStoresRes
}

////////////////////////////// TRANSACTION //////////////////////////////

export interface ITransaction {
  amount: number;
  transaction_from_id: number;
  transaction_to_id:number;
}

export interface ITransactionRes extends Omit<IBaseRes<ITransaction>, 'transaction_from_id' | 'transaction_to_id'> {
  transaction: IAccountRes
}

////////////////////////////////// CASHFLOW MONITOR /////////////////////

export interface ICashflowMonitor {
  bank_balance: number;
  account_balance: number;
  remaining: number;
  date: string;
  account_id: number;
  user_id: number;
}

export interface ICashflowMonitorRes extends Omit<IBaseRes<ICashflowMonitor>, 'account_id' | 'user_id'> {
  account: IAccountRes;
  user: IUserRes;
}

///////////////////////////////////// CASHFLOW ////////////////////////////

export interface ICashflow {
  date: string;
  income: number;
  outcome: number;
  converter_income: number;
  converter_putcome: number;
  exchange_rate: number;
  month: number;
  currency: string;
  comment: string;
  account_id:number;
  contingent_id: number;
  direction_id: number;
  employee_id: number;
  source_id: number;
  user_id: number;
}

export interface ICashflowRes extends Omit<IBaseRes<ICashflow>, 'account_id' | 'contingent_id' | 'direction_id' | 'employee_id' | 'source_id' | 'user_id'> {
  account: IAccountRes
  contingent: IContingentsRes
  direction: IDirectionRes
  employee_id: IUserRes
  source: ISourceRes
  user: IUserRes
}

///////////////////////////////// PRODUCTION MATERIALS ////////////////////////

export interface IProductionMaterial {
  amount: number;
  material_id: number;
  production_id:number;
  tmz_id: number;
}

export interface IProductionMaterialRes extends Omit<IBaseRes<IProductionMaterial>, 'material_id' | 'production_id' | 'tmz_id'> {
  material: IRawMaterialRes
  production: IProductionRes
  tmz: ITmzRes
}

/////////////////////////////////// CONTINGENT HISTORY ///////////////////////

export interface IContingentHistory {
  number: number;
  date: string;
  amount: number;
  exchange_rate: number;
  price: number;
  comment: string;
  contingent_id: number;
  product_id: number;
  store_id: number;
}

export interface IContingentHistoryRes extends Omit<IBaseRes<IContingentHistory>, 'contingent_id' | 'product_id' | 'store_id'> {
  contingent: IContingentHistoryRes
  product: ITmzRes
  store: IStoresRes
}

