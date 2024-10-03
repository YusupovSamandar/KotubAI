import { BrowserRouter as Router } from 'react-router-dom';
import RoutElements from './routes';
import LanguageProvider from './provider/language';
import ReduxProvider from './provider/redux';
import FullScreenProvider from './provider/fullScreen';
import AntConfigProvider from './provider/antConfig';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // <div>hello</div>
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
