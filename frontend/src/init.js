import App from './App';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { AuthProvider } from './chat/contexts/authContext';
import { SocketProvider } from './chat/contexts/socketContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './chat/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './chat/slices'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as leoProfanity from 'leo-profanity';

const init = async () => {
  const socket = io();

  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store} >
          <AuthProvider>
            <SocketProvider socket={socket}>
              <App />
              <ToastContainer />
            </SocketProvider>
          </AuthProvider>
        </Provider>
      </I18nextProvider>
  )

}

export default init;