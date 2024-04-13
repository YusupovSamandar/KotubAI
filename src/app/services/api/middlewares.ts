import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';
import { updateNegativeCellColor } from 'src/utils';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // RTK Query uses createAsyncThunk from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (action?.meta?.requestStatus === 'fulfilled') updateNegativeCellColor();
  if (isRejectedWithValue(action)) {
    const error_message =
      action.payload?.data?.message ??
      action.payload?.data?.msg ??
      action.payload?.data?.err?.message ??
      '';
    error_message &&
      error_message !== 'A validation error occurred.' &&
      message.warning(error_message);

    const errors = action.payload?.data?.errors ?? '';
    if (errors.length > 0) {
      errors.forEach((item: string) => {
        item && message.warning(item);
      });
    }

    const status = action.payload?.originalStatus;

    if (status === 500) {
      message.warning(
        "Server bilan bog'liq xatolik. Iltimos bu haqda ma'sul xodimlarga xabar bering"
      );
    } else if (status === 401 || status === 403) {
      window.location.href = '/auth/signin';
      message.warning('Iltimos avval tizimga kiring!');
    }
  }

  return next(action);
};
