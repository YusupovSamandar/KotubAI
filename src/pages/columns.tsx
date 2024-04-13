import {
  IContingentsRes,
  ICurrencyRes,
  ISourceRes,
  IUserRes,
} from 'src/app/services/helper';
import CustomInfo from 'src/components/common/info';
import { IColumn } from 'src/constants/type';

export const currencyColumns: IColumn<ICurrencyRes> = [
  {
    title: 'Sana',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Valyuta kursi',
    dataIndex: 'exchange_rate',
    key: 'exchange_rate',
  },
];

export const sourceColumns: IColumn<ISourceRes> = [
  {
    title: 'Nomi',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Kategoriya',
    dataIndex: 'category',
    key: 'category',
    render: (val) => val.title,
  },
  {
    title: 'Manbalar turi',
    dataIndex: 'is_expense',
    key: 'is_expense',
    render: (val) => (
      <CustomInfo
        info={val ? 'Chiqim' : 'Kirim'}
        type={val ? 'danger' : 'success'}
        width={70}
      />
    ),
  },
];

export const employeeColumns: IColumn<IUserRes> = [
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
    title: 'Sklad',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
];

export const contingentsColumn: IColumn<IContingentsRes> = [
  {
    title: 'Nomlari',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Viloyat',
    dataIndex: 'regionAdded',
    key: 'regionAdded',
  },
  {
    title: 'Shahar',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Sklad',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: 'INN',
    dataIndex: 'inn',
    key: 'inn',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
];
