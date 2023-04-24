import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TopPanel from '../components/TopPanel';
import Channels from '../components/Channels';
import ChatRoom from '../components/ChatRoom';
import Modal from '../components/modals/Modal';
import routes from '../routes';
import { fetchFromServer } from '../slices/channelsSlice';
import { useAuth } from '../contexts/contexts';
import notify from '../notifications';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!auth?.user?.token) {
      navigate(routes.pages.login);
    } else {
      const headers = auth.getAuthHeader();
      dispatch(fetchFromServer(headers))
        .catch((error) => {
          if (error.code === 401) {
            notify('error', t('errors.unauthorized'));
          } else {
            notify('error', error.isAxiosError ? t('errors.network') : t('errors.unknown'));
          }
        });
    }
  }, [auth, dispatch, navigate, t]);

  return (
    <>
      <TopPanel />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <ChatRoom />
          </div>
        </div>
      </div>

      <Modal />
    </>
  );
};

export default ChatPage;
