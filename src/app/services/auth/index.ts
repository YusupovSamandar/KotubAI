import { api } from '../api';
import {
  IConfirm,
  IConfirmRes,
  ILogin,
  ILoginRes,
  ILoginTelegramRes,
  IProfile,
  ILoginTelegram,
  IVerify,
} from './type';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Auth ////////
    //User login endpoint
    login: build.mutation<ILoginRes, ILogin>({
      query: (body) => ({
        url: 'auth/oauth2',
        method: 'POST',
        body,
      }),
    }),
    loginTelegram: build.mutation<ILoginTelegramRes, ILoginTelegram>({
      query: (body) => ({
        url: 'auth/telegram',
        method: 'POST',
        body,
      }),
    }),
    //User confirm endpoint
    confirm: build.mutation<IConfirmRes, IConfirm>({
      query: (body) => ({
        url: '/profile/phone-verify',
        method: 'POST',
        body,
      }),
    }),
    //User confirm endpoint
    verifyToken: build.mutation<IVerify, IVerify>({
      query: (body) => ({
        url: 'auth/token/verify',
        method: 'POST',
        body,
      }),
    }),

    loginWithAdmin: build.mutation<ILoginTelegramRes, void | Partial<any>>({
      query: () => ({
        url: 'auth/get-token',
        method: 'GET',
      }),
    }),

    //Get profile info endpoint
    getProfile: build.mutation<IProfile, void>({
      query: () => ({ url: 'auth/profile' }),
    }),
  }),
});

export const {
  useLoginMutation,
  useConfirmMutation,
  useGetProfileMutation,
  useVerifyTokenMutation,
  useLoginTelegramMutation,
  useLoginWithAdminMutation,
} = authApi;
