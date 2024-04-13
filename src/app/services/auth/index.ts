import { api } from '../api';
import { IConfirm, IConfirmRes, ILogin, ILoginRes, IProfile } from './type';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    //////// Auth ////////
    //User login endpoint
    login: build.mutation<ILoginRes, ILogin>({
      query: (body) => ({
        url: 'api/auth/oauth2',
        method: 'POST',
        body,
      }),
    }),
    //User confirm endpoint
    confirm: build.mutation<IConfirmRes, IConfirm>({
      query: (body) => ({
        url: '/users/profile/phone-verify',
        method: 'POST',
        body,
      }),
    }),

    //Get profile info endpoint
    getProfile: build.mutation<IProfile, void>({
      query: () => ({ url: '/users/profile' }),
    }),
  }),
});

export const { useLoginMutation, useConfirmMutation, useGetProfileMutation } =
  authApi;
