import { api, paymentApi } from '../api';
import {
  IGenerateOrderId,
  IGenerateOrderIdRes,
  IGeneratePaymentClicklink,
  IGeneratePaymentClicklinkRes,
  IGeneratePaymentPaymelink,
  IGeneratePaymentPaymelinkRes,
} from './type';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    generateOrderId: build.mutation<IGenerateOrderIdRes, IGenerateOrderId>({
      query: (body) => ({
        url: 'order-payment',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const financeApi = paymentApi.injectEndpoints({
  endpoints: (build) => ({
    //endpoint/payments/pay-link/
    generateClickPaymentlink: build.mutation<
      IGeneratePaymentClicklinkRes,
      IGeneratePaymentClicklink
    >({
      query: (body) => ({
        url: 'click/pay-link/',
        method: 'POST',
        body,
      }),
    }),
    generatePaymePaymentlink: build.mutation<
      IGeneratePaymentPaymelinkRes,
      IGeneratePaymentPaymelink
    >({
      query: (body) => ({
        url: 'payme/pay-link/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGenerateClickPaymentlinkMutation,
  useGeneratePaymePaymentlinkMutation,
} = financeApi;

export const { useGenerateOrderIdMutation } = ordersApi;
