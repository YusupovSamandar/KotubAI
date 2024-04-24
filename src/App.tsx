import { BrowserRouter as Router } from 'react-router-dom';
import RoutElements from './routes';
import LanguageProvider from './provider/language';
import ReduxProvider from './provider/redux';
import FullScreenProvider from './provider/fullScreen';
import AntConfigProvider from './provider/antConfig';
import { useEffect } from 'react';
import { useLoginTelegramMutation } from './app/services/auth';

function App() {
  const [loginWithTelegram] = useLoginTelegramMutation();
  useEffect(() => {
    // Check if the Telegram object exists on the window
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      console.log('Telegram user data:', userData);
      loginWithTelegram({
        first_name: userData.first_name,
        last_name: userData.last_name,
        telegram_id: userData.id,
      });
      // Proceed with the authentication process using userData
    } else {
      console.log('Telegram object not available');
    }
  }, []);
  return (
    <LanguageProvider>
      <ReduxProvider>
        <FullScreenProvider>
          <Router>
            <AntConfigProvider>
              <RoutElements />
            </AntConfigProvider>
          </Router>
        </FullScreenProvider>
      </ReduxProvider>
    </LanguageProvider>
  );
}

export default App;
