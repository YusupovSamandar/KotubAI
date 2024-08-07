import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import auth from 'src/app/slices/authSlice';
import userHistory from 'src/app/slices/historySlice';
import language from 'src/app/slices/languageSlice';
import layout from 'src/app/slices/layoutSlice';
import { api, paymentApi } from './services/api';
import { rtkQueryErrorLogger } from './services/api/middlewares';
import notifySlice from './slices/notifySlice';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      auth,
      notifySlice,
      userHistory,
      layout,
      language,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        api.middleware,
        paymentApi.middleware,
        rtkQueryErrorLogger
      ),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getRootState = () => store.getState();
