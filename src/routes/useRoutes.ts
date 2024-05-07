import { useEffect } from 'react';
import {
  useLoginTelegramMutation,
  useVerifyTokenMutation,
} from 'src/app/services/auth';
import { logout } from 'src/app/slices/authSlice';
import {
  changeIsTelegramWebApp,
  changeTheme,
} from 'src/app/slices/layoutSlice';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { isDarkTheme } from 'src/constants/storage';

export default function useRoutes() {
  //Set default colors
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeTheme(isDarkTheme ? 'dark' : 'light'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Authenticate
  const { isAuthenticated, token } = useTypedSelector((state) => state.auth);
  const { deviceType } = useTypedSelector((state) => state.layout);
  const [loginTelegram] = useLoginTelegramMutation();
  const [verifyToken] = useVerifyTokenMutation();

  useEffect(() => {
    // Check if the Telegram object exists on the window
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      if (!userData) {
        dispatch(changeIsTelegramWebApp('default'));
        return;
      } else {
        if (token) {
          verifyToken({ token })
            .unwrap()
            .then(() => {
              dispatch(changeIsTelegramWebApp('telegram'));
            })
            .catch(() => {
              dispatch(logout());
            });
        } else {
          loginTelegram({
            first_name: userData.first_name,
            last_name: userData.last_name,
            telegram_id: userData.id,
          })
            .unwrap()
            .then(() => {
              dispatch(changeIsTelegramWebApp('telegram'));
            });
        }
      }
      // Proceed with the authentication process using userData
    } else {
      console.log('Telegram object not available');
    }
  }, [token]);

  return {
    isAuthenticated,
    deviceType,
  };
}
