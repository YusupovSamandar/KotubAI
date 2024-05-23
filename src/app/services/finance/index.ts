import { api, paymentApi } from '../api';
import {
  ICheckPaymentStatusRes,
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
    checkPaymentStatus: build.mutation<ICheckPaymentStatusRes, string>({
      query: (body) => ({
        url: 'payment/status-check',
        params: { transaction_id: body },
      }),
    }),
  }),
});

export const {
  useGenerateClickPaymentlinkMutation,
  useGeneratePaymePaymentlinkMutation,
  useCheckPaymentStatusMutation,
} = financeApi;

export const { useGenerateOrderIdMutation } = ordersApi;
