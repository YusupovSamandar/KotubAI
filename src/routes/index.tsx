import { Route, Routes, useLocation } from 'react-router-dom';
import DashboardLayout from 'src/layout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Custom404 from 'src/pages/404';
import ConfirmPage from 'src/pages/auth/confirm';
import SignInPageOrigin from 'src/pages/auth/signIn';
import useRoutes from './useRoutes';
import Main from 'src/pages/main';
import Workspace from 'src/pages/workspace';
import SignInPage from 'src/pages/signIn';

const clientId = import.meta.env.VITE_OAuthClientId;

function RoutElements() {
  const { isAuthenticated } = useRoutes();
  const location = useLocation();
  return (
    <div className="root">
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
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
                  <Route path="confirm" element={<ConfirmPage />} />
                </Route>
                <Route path="*" element={<SignInPage />} />
              </>
            )}
            <Route />
          </Route>
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default RoutElements;
