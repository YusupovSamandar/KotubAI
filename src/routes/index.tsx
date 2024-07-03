import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, useLocation } from 'react-router-dom';
import DashboardLayout from 'src/layout';
import Main from 'src/pages/main';
import SignInPage from 'src/pages/signIn';
import Workspace from 'src/pages/workspace';
import useRoutes from './useRoutes';
import { Aferta, PrivacyPolicy } from 'src/pages/signIn/aferta';
import VideoPlayerWorskpace from 'src/pages/videoplayer';

const clientId = import.meta.env.VITE_OAuthClientId;

function RoutElements() {
  const { isAuthenticated, deviceType } = useRoutes();
  const location = useLocation();

  return (
    <div className="root">
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path="/oferta" element={<Aferta />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/video-player" element={<VideoPlayerWorskpace />} />
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

                  <Route path="/404" element={<Main />} />
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
