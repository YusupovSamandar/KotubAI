import { BrowserRouter as Router } from 'react-router-dom';
import RoutElements from './routes';
import LanguageProvider from './provider/language';
import ReduxProvider from './provider/redux';
import FullScreenProvider from './provider/fullScreen';
import AntConfigProvider from './provider/antConfig';

import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from 'src/firebase/firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Message from 'src/components/common/Message';
import { useEffect } from 'react';
const { VITE_APP_VAPID_KEY } = import.meta.env;
import 'react-toastify/dist/ReactToastify.css';

function App() {
  onMessage(messaging, (payload) => {
    toast(
      <Message notification={payload.notification} hidden={payload.data} />
    );
  });
  useEffect(() => {
    const handleUserInteraction = () => {
      requestPermission();
      window.removeEventListener('click', handleUserInteraction);
    };
    window.addEventListener('click', handleUserInteraction);
    async function requestPermission() {
      //requesting permission using Notification API
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: VITE_APP_VAPID_KEY,
        });
        localStorage.setItem('FCMtoken', token);
        //We can send token to server
        console.log('Token generated : ', token);
      } else if (permission === 'denied') {
        //notifications are blocked
        console.log('You denied for the notification');
      }
    }
    return () => {
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    // <div>hello</div>
    <LanguageProvider>
      <ReduxProvider>
        <FullScreenProvider>
          <Router>
            <AntConfigProvider>
              <RoutElements />
            </AntConfigProvider>
            <ToastContainer />
          </Router>
        </FullScreenProvider>
      </ReduxProvider>
    </LanguageProvider>
  );
}

export default App;
