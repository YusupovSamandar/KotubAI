import { Route, Routes, useLocation } from 'react-router-dom';
import DashboardLayout from 'src/layout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useRoutes from './useRoutes';
import Main from 'src/pages/main';
import Workspace from 'src/pages/workspace';
import SignInPage from 'src/pages/signIn';
import { useEffect } from 'react';
import { useLoginTelegramMutation } from 'src/app/services/auth';
import { useDispatch } from 'react-redux';
import { changeIsTelegramWebApp } from 'src/app/slices/layoutSlice';
import { useTypedSelector } from 'src/app/store';

const clientId = import.meta.env.VITE_OAuthClientId;

function RoutElements() {
  const { deviceType } = useTypedSelector((state) => state.layout);
  const dispatch = useDispatch();
  const [loginWithTelegram] = useLoginTelegramMutation();
  useEffect(() => {
    // Check if the Telegram object exists on the window
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      if (!userData) {
        dispatch(changeIsTelegramWebApp('default'));
        return;
      } else {
        loginWithTelegram({
          first_name: userData.first_name,
          last_name: userData.last_name,
          telegram_id: userData.id,
        })
          .unwrap()
          .then(() => {
            dispatch(changeIsTelegramWebApp('telegram'));
          });
      }
      // Proceed with the authentication process using userData
    } else {
      console.log('Telegram object not available');
    }
  }, []);
  const { isAuthenticated } = useRoutes();
  const location = useLocation();
  return (
    <div className="root">
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          {deviceType && (
            <Route
              path="/"
              element={isAuthenticated ? <DashboardLayout /> : null}
            >
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Main />} />
                  <Route
                    path=":id"
                    // render={() => <Workspace />}
                    element={<Workspace key={location.pathname} />}
                  />
                </>
              ) : (
                <>
                  <Route index element={<SignInPage />} />
                  <Route path="/auth">
                    <Route path="signin" element={<SignInPage />} />
                  </Route>
                  <Route path="*" element={<SignInPage />} />
                </>
              )}
              <Route />
            </Route>
          )}
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default RoutElements;
