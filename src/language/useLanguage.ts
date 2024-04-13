import { message } from 'antd';
import { IRegion } from 'src/app/services/classifiers/type';
import {
  IAvilableProduct,
  IBasicToolRes,
  ILotIncomeRes,
  ILotOutcomeRes,
  ILotRes,
  IProductRes,
  IRevaluateRes,
  IStoreRes,
  IStoreStatTable,
} from 'src/app/services/commerce/type';
import { ISourceRes } from 'src/app/services/finance/type';
import {
  IAccountRes,
  ICompanyRes,
  IContingentDetailRes,
  IContingentsRes,
  IEmployeeRes,
  ISalaryRes,
} from 'src/app/services/management/type';
import { IColumn } from 'src/constants/type';
import { makePhoneMask, prettierNumber } from 'src/utils';

export default function useLanguage() {
  const storeColumns: IColumn<IStoreRes> = [
    {
      title: 'Yaratilgan sana',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 140,
      render: (val: string) => val.slice(0, 10),
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Manzil',
      dataIndex: 'region',
      key: 'region',
      render: (val: IRegion) => val.name_uz,
    },
  ];

  const companyColumns: IColumn<ICompanyRes> = [
    {
      title: 'Yaratilgan sana',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
    },
    {
      title: 'Nomi',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  const accountsColumns: IColumn<IAccountRes> = [
    {
      title: 'Yaratilgan sana',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 140,
      render: (val: string) => val.slice(0, 10),
    },
    {
      title: 'Nomi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Hozirgi balans',
      dataIndex: 'balance',
      key: 'balance',
      render: (val) => prettierNumber(val),
    },
  ];

  const productsColumns: IColumn<IProductRes> = [
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Narx (so`m)',
      dataIndex: 'price',
      key: 'price',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Miqdor',
      dataIndex: 'unit',
      key: 'unit',
      render: (val, el) => prettierNumber(el.quantity) + ' ' + findUnit(val),
    },
  ];

  const sourceColumns: IColumn<ISourceRes> = [
    {
      title: 'Kodi',
      dataIndex: 'number',
      key: 'number',
      width: '20%',
    },
    {
      title: 'Nomi',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: 'Kategoriya',
      dataIndex: 'category',
      key: 'category',
      width: 180,
      render: (val) => val.title,
    },
  ];

  const contingentColumns: IColumn<IContingentsRes> = [
    {
      title: 'Nomer',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Brand nomi',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Firma nomi',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Ombor',
      dataIndex: 'store',
      key: 'store',
      render: (val) => val?.name,
    },
    {
      title: 'Inn / Swift',
      dataIndex: 'inn',
      key: 'inn',
    },
  ];

  const contingentColumns2: IColumn<IContingentsRes> = [
    {
      title: 'Kontragentlar',
      dataIndex: 'type',
      key: 'type',
      render: (val) => (val === 'customer' ? 'Xaridor' : 'Yetkazib beruvchi'),
    },
    {
      title: 'IFUT',
      dataIndex: 'ifut',
      key: 'ifut',
    },
    {
      title: 'MFO',
      dataIndex: 'mfo',
      key: 'mfo',
    },
    {
      title: 'Bank',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Hisob raqam',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'OKONX',
      dataIndex: 'okonx',
      key: 'okonx',
    },
  ];

  // Balance Contingent
  const balanceContingentColumns: IColumn<IContingentsRes> = [
    {
      title: 'Nomlari',
      dataIndex: 'first_name',
      key: 'first_name',
    },
  ];

  const contingentInfoColunm: IColumn<IContingentsRes> = [
    {
      title: 'Umumiy miqdor',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Umumiy summa',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (val) => prettierNumber(val),
    },
    {
      title: `To'langan summa`,
      dataIndex: 'total_paid_amount',
      key: 'total_paid_amount',
      render: (val) => prettierNumber(val),
    },
    {
      title: `Qolgan summa`,
      dataIndex: 'total_remaining_amount',
      key: 'total_remaining_amount',
      render: (val) => prettierNumber(val),
    },
  ];

  const contingentInsideColunm: IColumn<IContingentDetailRes> = [
    {
      title: 'Shartnoma raqami',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Malumot',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Maxsulot',
      dataIndex: 'product',
      key: 'product',
      render: (val) => val?.name,
    },
    {
      title: 'Miqdor',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (val, el) => findAmount(val, el.product),
    },
    {
      title: 'Summa (so`m)',
      dataIndex: 'sum',
      key: 'sum',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Bank xizmati (so`m)',
      dataIndex: 'bank_cost',
      key: 'bank_cost',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Izoh',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  /////////// Basic Tool ///////////
  const basicToolsColumn: IColumn<IBasicToolRes> = [
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Invertal raqam',
      dataIndex: 'invertal_number',
      key: 'invertal_number',
    },
    {
      title: 'Qiymat (so`m)',
      dataIndex: 'price',
      key: 'price',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Sana',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Hozirgi qiymat (so`m)',
      dataIndex: 'remaining_price',
      key: 'remaining_price',
      render: (val) => prettierNumber(Math.round(val)),
    },
  ];

  /////////// Basic Tool ///////////
  const balanceBasicToolsColumn: IColumn<IBasicToolRes> = [
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Qiymat',
      dataIndex: 'price',
      key: 'price',
      render: (val) => prettierNumber(val),
    },

    {
      title: 'Hozirgi qiymat',
      dataIndex: 'remaining_price',
      key: 'remaining_price',
      render: (val) => prettierNumber(Math.round(val)),
    },
  ];

  /////////// Revaluate ///////////
  const revaluateColunms: IColumn<IRevaluateRes> = [
    {
      title: 'Qayta baholashdan keyin yil boshiga',
      dataIndex: 'recalculation_value',
      key: 'recalculation_value',
      colSpan: 3,
    },
    {
      dataIndex: 'recalculate_amortization_value',
      key: 'recalculate_amortization_value',
      colSpan: 0,
    },
    {
      dataIndex: 'recalculate_amortization_residual',
      key: 'recalculate_amortization_residual',
      colSpan: 0,
    },
    {
      title: 'Dastlabki (tiklash qiymati)',
      dataIndex: 'initial_recovery_value',
      key: 'initial_recovery_value',
    },
    {
      title: 'Shu yillik amortizatsiya',
      dataIndex: 'annual_amortization_value',
      key: 'annual_amortization_value',
    },
    {
      title: 'Jami amortizatsiya',
      dataIndex: 'total_amortization',
      key: 'total_amortization',
    },
    {
      title: 'Qoldi qiymat',
      dataIndex: 'residual_value',
      key: 'residual_value',
    },
  ];

  ////////////// Employee /////////
  const employeeColumns: IColumn<IEmployeeRes> = [
    {
      title: 'Authors',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
      render: (val) => makePhoneMask(val.split('998')?.[1]),
    },
    {
      title: 'Ombor',
      dataIndex: 'store',
      key: 'store',
      render: (val) => val.title,
    },
    {
      title: 'Mansab',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Ishga olingan sana',
      dataIndex: 'hired_date',
      key: 'hired_date',
    },
  ];

  ////////////// Lots /////////
  const lotColumns: IColumn<ILotRes> = [
    {
      title: 'Authors',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ombor',
      dataIndex: 'store',
      key: 'store',
      render: (val) => val.title,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Izoh',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const lotIncomeColumns: IColumn<ILotIncomeRes> = [
    {
      title: 'Product Nomi',
      dataIndex: 'product',
      key: 'product',
      render: (val) => val?.name,
    },
    {
      title: 'Miqdor',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (val, el) => (val ? findAmount(val, el.product) : ''),
    },
    {
      title: 'Narxi (so`m)',
      dataIndex: 'cost',
      key: 'cost',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Narxi (do`llar)',
      dataIndex: 'cost_usd',
      key: 'cost_usd',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Valyuta kursi',
      dataIndex: 'exchange_rate',
      key: 'exchange_rate',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Bank xizmati (so`m)',
      dataIndex: 'bank_cost',
      key: 'bank_cost',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Pastavshik',
      dataIndex: 'provider',
      key: 'provider',
      render: (val) => val?.first_name,
    },
    {
      title: 'Izoh',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const lotOutcomeColumns: IColumn<ILotOutcomeRes> = [
    {
      title: 'Chiqim turi',
      dataIndex: 'outcome_type',
      key: 'outcome_type',
      render: (val) => val?.title,
    },
    {
      title: 'Sana',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Narxi (so`m)',
      dataIndex: 'price',
      key: 'price',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Narxi (do`llar)',
      dataIndex: 'price_usd',
      key: 'price_usd',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Valyuta kursi',
      dataIndex: 'exchange_rate',
      key: 'exchange_rate',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Bank xizmati (so`m)',
      dataIndex: 'bank_cost',
      key: 'bank_cost',
      render: (val) => prettierNumber(val),
    },
    {
      title: 'Izoh',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const storeStatColumns: IColumn<IStoreStatTable> = [
    {
      title: 'Oylar',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Oy boshiga qoldiq',
      dataIndex: 'previous_balance',
      key: 'previous_balance',
    },
    {
      title: 'Kirim',
      dataIndex: 'income',
      key: 'income',
    },
    {
      title: 'Chiqim',
      dataIndex: 'expenses',
      key: 'expenses',
    },
    {
      title: 'Permeshsheniye',
      dataIndex: 'transfers_in',
      key: 'transfers_in',
    },
    {
      title: 'Oy oxiriga qoldiq',
      dataIndex: 'ending_balance',
      key: 'ending_balance',
    },
    {
      title: 'Izoh',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const storageBasicToolsColumn: IColumn<IStoreRes> = [
    {
      title: 'Omborlar',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Narx',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const productBalanceSheetsColumn: IColumn<IAvilableProduct> = [
    {
      title: 'Mahsulot',
      dataIndex: 'product_name',
      key: 'product_name',
      width: 180,
    },
    {
      title: 'Hozirgi miqdor',
      dataIndex: 'total_available_amount',
      key: 'total_available_amount',
      width: 140,
    },
    {
      title: "O'tkazma miqdori",
      dataIndex: 'total_transferred_amount',
      key: 'total_transferred_amount',
      width: 140,
    },
  ];

  const salaryColumns: IColumn<ISalaryRes> = [
    {
      title: 'Sana',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Xodim & Xodimlar',
      dataIndex: 'employees',
      key: 'employees',
      render: (res: IEmployeeRes[]) =>
        res?.map((el) => el.first_name).join(', '),
    },
    {
      title: 'Oy boshiga DT',
      dataIndex: 'start_month_owe_us',
      key: 'start_month_owe_us',
    },
    {
      title: 'Oy boshiga KT',
      dataIndex: 'start_month_we_owe',
      key: 'start_month_we_owe',
    },
    {
      title: 'Jami hisoblandi',
      dataIndex: 'total_income',
      key: 'total_income',
    },
    {
      title: '12% Daromad solig`i',
      dataIndex: 'income_tax',
      key: 'income_tax',
    },
    {
      title: '1% БТПЖ',
      dataIndex: 'pension_tax',
      key: 'pension_tax',
    },
    {
      title: 'Kassadan',
      dataIndex: 'cash',
      key: 'cash',
    },
    {
      title: 'Plastikdan',
      dataIndex: 'plastic',
      key: 'plastic',
    },
    {
      title: 'Yer mulk solig`i',
      dataIndex: 'property_tax',
      key: 'property_tax',
    },
    {
      title: 'Boshqalar',
      dataIndex: 'other_deductions',
      key: 'other_deductions',
    },
    {
      title: 'Jami ushlandi',
      dataIndex: 'total_deductions',
      key: 'total_deductions',
    },
    {
      title: 'Qo`lga tegishi',
      dataIndex: 'net_salary',
      key: 'net_salary',
    },
    {
      title: 'Oy oxiriga DT',
      dataIndex: 'end_month_owe_us',
      key: 'end_month_owe_us',
    },
    {
      title: 'Oy oxiriga KT',
      dataIndex: 'end_month_we_owe',
      key: 'end_month_we_owe',
    },
    {
      title: 'Yil boshidan o`sib boruvchi',
      dataIndex: 'year_start_balance',
      key: 'year_start_balance',
    },
  ];

  const findMonth = (key: string) => {
    switch (key) {
      case '1':
        return 'Yanvar';
      case '2':
        return 'Fevral';
      case '3':
        return 'Mart';
      case '4':
        return 'Aprel';
      case '5':
        return 'May';
      case '6':
        return 'Iyun';
      case '7':
        return 'Iyul';
      case '8':
        return 'Avgust';
      case '9':
        return 'Sentabr';
      case '10':
        return 'Oktabr';
      case '11':
        return 'Noyabr';
      case '12':
        return 'Dekabr';
      default:
        return '';
    }
  };

  const findAmount = (amount: number, product?: IProductRes) => {
    if (!product) return;
    return prettierNumber(amount) + ' ' + findUnit(product.unit);
  };

  const findUnit = (key: string) => {
    let unit = unitOptions.find((el) => el.value === key)?.label;
    return unit;
  };

  const unitOptions = [
    { value: 'pack', label: `to'plam` },
    { value: 'box', label: `quti` },
    { value: 'piece', label: `dona` },
    { value: 'kg', label: 'kg' },
    { value: 'l', label: 'litr' },
  ];

  const onCatch = (err: any) => {
    if (!err.data) return;
    for (const [key] of Object.entries(err.data)) {
      if (key === 'inn') {
        message.error('Bunday INN avval kirilgan');
        return key;
      }
    }
  };

  return {
    companyColumns,
    accountsColumns,
    productsColumns,
    storeColumns,
    sourceColumns,
    productBalanceSheetsColumn,
    contingentColumns,
    contingentColumns2,
    balanceContingentColumns,
    contingentInfoColunm,
    contingentInsideColunm,
    basicToolsColumn,
    balanceBasicToolsColumn,
    revaluateColunms,
    employeeColumns,
    lotColumns,
    lotIncomeColumns,
    lotOutcomeColumns,
    storeStatColumns,
    unitOptions,
    storageBasicToolsColumn,
    salaryColumns,
    findMonth,
    findUnit,
    findAmount,
    onCatch,
  };
}
