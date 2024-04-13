import { BrowserRouter as Router } from 'react-router-dom';
import RoutElements from './routes';
import LanguageProvider from './provider/language';
import ReduxProvider from './provider/redux';
import FullScreenProvider from './provider/fullScreen';
import AntConfigProvider from './provider/antConfig';

function App() {
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
