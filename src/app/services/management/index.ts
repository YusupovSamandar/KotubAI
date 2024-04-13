import { api } from '../api';
import { IBaseDataRes, IBaseEdit, IBaseRes } from '../type';
import {
  IAccount,
  IAccountRes,
  ICompany,
  ICompanyRes,
  IContingentDetail,
  IContingentDetailRes,
  IContingents,
  IContingentsRes,
  IEmployee,
  IEmployeeRes,
  ISalary,
  ISalaryRes,
} from './type';

export const managementApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Company ////////
    //Get company endpoint
    getCompany: build.mutation<IBaseDataRes<ICompanyRes>, void>({
      query: () => ({ url: '/management/company' }),
    }),

    //Add company endpoint
    addCompany: build.mutation<ICompanyRes, ICompany>({
      query: (body) => ({
        url: '/management/company',
        method: 'POST',
        body,
      }),
    }),

    //Edit company endpoint
    editCompany: build.mutation<ICompanyRes, IBaseEdit<ICompany>>({
      query: ({ id, body }) => ({
        url: '/management/company/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete company endpoint
    deleteCompany: build.mutation<ICompanyRes, number>({
      query: (id) => ({
        url: '/management/company/' + id,
        method: 'DELETE',
      }),
    }),

    /////////// Account ////////
    //Get account endpoint
    getAccount: build.mutation<IBaseDataRes<IAccountRes>, void>({
      query: () => ({ url: '/finance/account' }),
    }),

    //Add account endpoint
    addAccount: build.mutation<IAccountRes, IAccount>({
      query: (body) => ({
        url: '/finance/account',
        method: 'POST',
        body,
      }),
    }),

    //Edit account endpoint
    editAccount: build.mutation<IAccountRes, IBaseEdit<IAccount>>({
      query: ({ id, body }) => ({
        url: '/finance/account/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete account endpoint
    deleteAccount: build.mutation<IAccountRes, number>({
      query: (id) => ({
        url: '/finance/account/' + id,
        method: 'DELETE',
      }),
    }),

    ////////////////// Contingents ////////////////
    //Get account endpoint
    getContingent: build.mutation<IBaseDataRes<IContingentsRes>, string | void>(
      {
        query: (params) => ({
          url: '/management/counterparty' + (params || ''),
        }),
      }
    ),
    getContingentById: build.mutation<IContingentsRes, number>({
      query: (id) => ({
        url: '/management/counterparty/' + id,
      }),
    }),

    //Add Contingent endpoint
    addContingent: build.mutation<IContingentsRes, IContingents>({
      query: (body) => ({
        url: '/management/counterparty',
        method: 'POST',
        body,
      }),
    }),

    //Edit Contingent endpoint
    editContingent: build.mutation<IContingentsRes, IBaseEdit<IContingents>>({
      query: ({ id, body }) => ({
        url: '/management/counterparty/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete account endpoint
    deleteContingent: build.mutation<IContingentsRes, number>({
      query: (id) => ({
        url: '/management/counterparty/' + id,
        method: 'DELETE',
      }),
    }),

    getContingentDetail: build.mutation<
      IBaseDataRes<IContingentDetailRes>,
      number
    >({
      query: (id) => ({ url: `/management/counterparty/${id}/history` }),
    }),

    //Add Contingent endpoint
    addContingentDetail: build.mutation<
      IContingentDetailRes,
      IBaseEdit<IContingentDetail>
    >({
      query: ({ id, body }) => ({
        url: `/management/counterparty/${id}/history`,
        method: 'POST',
        body,
      }),
    }),

    //Edit Contingent endpoint
    editContingentDetail: build.mutation<
      IContingentDetailRes,
      IBaseEdit<IContingentDetail>
    >({
      query: ({ id, body, id2 }) => ({
        url: `/management/counterparty/${id}/history/${id2}`,
        method: 'PUT',
        body,
      }),
    }),

    //Delete account endpoint
    deleteContingentDetail: build.mutation<
      IContingentDetailRes,
      { id: number; id2: string }
    >({
      query: ({ id, id2 }) => ({
        url: `/management/counterparty/${id}/history/${id2}`,
        method: 'DELETE',
      }),
    }),

    ///////////// Employee ////////////////
    //Get account endpoint
    getEmployee: build.mutation<IBaseDataRes<IEmployeeRes>, void>({
      query: () => ({ url: '/management/employee' }),
    }),

    //Add account endpoint
    addEmployee: build.mutation<IEmployeeRes, IEmployee>({
      query: (body) => ({
        url: '/management/employee',
        method: 'POST',
        body,
      }),
    }),

    //Edit account endpoint
    editEmployee: build.mutation<IEmployeeRes, IBaseEdit<IEmployee>>({
      query: ({ id, body }) => ({
        url: '/management/employee/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete account endpoint
    deleteEmployee: build.mutation<IEmployeeRes, number>({
      query: (id) => ({
        url: '/management/employee/' + id,
        method: 'DELETE',
      }),
    }),

    ///////////// Employee salary ////////////////
    //Get account endpoint
    getSalary: build.mutation<IBaseDataRes<ISalaryRes>, void>({
      query: () => ({ url: '/management/employee-salary' }),
    }),

    //Add account endpoint
    addSalary: build.mutation<ISalaryRes, ISalary>({
      query: (body) => ({
        url: '/management/employee-salary',
        method: 'POST',
        body,
      }),
    }),

    //Edit account endpoint
    editSalary: build.mutation<ISalaryRes, IBaseEdit<ISalary>>({
      query: ({ id, body }) => ({
        url: '/management/employee-salary/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete account endpoint
    deleteSalary: build.mutation<ISalaryRes, number>({
      query: (id) => ({
        url: '/management/employee-salary/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  //Company
  useGetCompanyMutation,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
  //Account
  useGetAccountMutation,
  useAddAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation,
  //Contingent
  useGetContingentMutation,
  useGetContingentByIdMutation,
  useAddContingentMutation,
  useEditContingentMutation,
  useDeleteContingentMutation,
  //Contingent Detail
  useGetContingentDetailMutation,
  useAddContingentDetailMutation,
  useEditContingentDetailMutation,
  useDeleteContingentDetailMutation,

  ///// Employee /////////
  useGetEmployeeMutation,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,

  ///// Salary /////////
  useGetSalaryMutation,
  useAddSalaryMutation,
  useEditSalaryMutation,
  useDeleteSalaryMutation,
} = managementApi;
