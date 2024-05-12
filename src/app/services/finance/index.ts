import { api } from '../api';
import { IBaseDataRes, IBaseEdit } from '../type';
import {
  ICash,
  ICashRes,
  IGeneratePaymentlink,
  IGeneratePaymentlinkRes,
  ISource,
  ISourceRes,
} from './type';

export const financeApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Cash ////////
    //Get cash endpoint

    //Add source endpoint/payments/pay-link/
    generatePaymentlink: build.mutation<
      IGeneratePaymentlinkRes,
      IGeneratePaymentlink
    >({
      query: (body) => ({
        url: 'payments/pay-link/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGeneratePaymentlinkMutation } = financeApi;
