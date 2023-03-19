import TopPanel from '../components/TopPanel';
import Channels from '../components/Channels';
import ChatRoom from '../components/ChatRoom';

import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFromServer } from '../slices/channelsSlice';

import { useAuth } from '../contexts/contexts';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useAuth();

  useEffect(() => {
    if (!auth?.user?.token) {
      navigate(routes.pages.login);
    } else {
      const headers = auth.getAuthHeader();
      dispatch(fetchFromServer(headers));
    }
  }, [auth, dispatch, navigate]);

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
    </>
  );
};

export default ChatPage;
