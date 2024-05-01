import { createSlice } from '@reduxjs/toolkit';
import {
  PROFILE,
  TOKEN,
  REFRESH_TOKEN,
  profile,
  token,
  refreshToken,
} from 'src/constants/storage';
import { IProfile } from '../services/auth/type';
import { authApi } from '../services/auth';

export interface IAuthState {
  token?: string;
  refreshToken?: string;
  isAuthenticated: boolean;
  profile?: IProfile;
}

const initialState: IAuthState = {
  token: token || '',
  refreshToken: refreshToken || '',
  isAuthenticated: refreshToken ? true : false,
  profile: profile ? JSON.parse(profile) : undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
      state.profile = undefined;

      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token.access;
        state.refreshToken = action.payload.token.refresh;
        state.isAuthenticated = true;

        localStorage.setItem(TOKEN, action.payload.token.access);
      })
      .addMatcher(
        authApi.endpoints.loginTelegram.matchFulfilled,
        (state, action) => {
          console.log(action.payload);

          state.token = action.payload.tokens.access;
          state.refreshToken = action.payload.tokens.refresh;
          state.isAuthenticated = true;

          localStorage.setItem(TOKEN, action.payload.tokens.access);
          localStorage.setItem(REFRESH_TOKEN, action.payload.tokens.refresh);
        }
      )
      .addMatcher(authApi.endpoints.confirm.matchFulfilled, (state, action) => {
        state.token = action.payload.tokens.access;
        state.isAuthenticated = true;
        // state.profile = action.payload.profile;

        localStorage.setItem(TOKEN, action.payload.tokens.access);
        // localStorage.setItem(PROFILE, JSON.stringify(action.payload.profile));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
