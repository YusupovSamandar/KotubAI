import { api } from '../api';
import { IBaseDataRes, IBaseEdit } from '../type';
import { ICash, ICashRes, ISource, ISourceRes } from './type';

export const financeApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Cash ////////
    //Get cash endpoint
    getCash: build.mutation<IBaseDataRes<ICashRes>, void>({
      query: () => ({ url: '/finance/cashflow' }),
    }),

    //Add cash endpoint
    addCash: build.mutation<ICashRes, ICash>({
      query: (body) => ({
        url: '/finance/cashflow',
        method: 'POST',
        body,
      }),
    }),

    //Edit cash endpoint
    editCash: build.mutation<ICashRes, IBaseEdit<ICash>>({
      query: ({ id, body }) => ({
        url: '/finance/cashflow/' + id,
        method: 'PATCH',
        body,
      }),
    }),

    //Delete cash endpoint
    deleteCash: build.mutation<ICashRes, number>({
      query: (id) => ({
        url: '/finance/cashflow/' + id,
        method: 'DELETE',
      }),
    }),

    //////// Souce ////////
    //Get source endpoint
    getSource: build.mutation<IBaseDataRes<ISourceRes>, void>({
      query: () => ({ url: '/finance/source' }),
    }),

    //Add source endpoint
    addSource: build.mutation<ISourceRes, ISource>({
      query: (body) => ({
        url: '/finance/source',
        method: 'POST',
        body,
      }),
    }),

    //Edit source endpoint
    editSource: build.mutation<ISourceRes, IBaseEdit<ISource>>({
      query: ({ id, body }) => ({
        url: '/finance/source/' + id,
        method: 'PUT',
        body,
      }),
    }),

    //Delete source endpoint
    deleteSource: build.mutation<ISourceRes, number>({
      query: (id) => ({
        url: '/finance/source/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  // Cash
  useGetCashMutation,
  useAddCashMutation,
  useEditCashMutation,
  useDeleteCashMutation,
  // Source
  useGetSourceMutation,
  useAddSourceMutation,
  useEditSourceMutation,
  useDeleteSourceMutation,
} = financeApi;
