import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFromServer } from '../slices/channelsSlice';

import Channels from '../components/Channels';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      navigate(routes.pages.login);
    } else {
      const headers = { Authorization: `Bearer ${token}` };
      dispatch(fetchFromServer(headers));
    }
  }, [navigate, dispatch]);

  return (
    <>
      <Nav></Nav>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <Channels />
          </div>
          <div className="col p-0 h-100">

          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
