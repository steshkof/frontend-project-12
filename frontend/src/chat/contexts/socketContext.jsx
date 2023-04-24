import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice';

const SocketContext = createContext({});

const connectionTimeout = 3000;
const emitWithConnetionTimeout = async (socket, event, data) => new Promise((resolve, reject) => {
  const getLogMessage = (e) => {
    const events = {
      newMessage: 'Message sent',
      newChannel: 'Channel Added',
      removeChannel: 'Channel Removed',
      renameChannel: 'Channel Renamed',
    };
    return `${events[e]}. Server response:`;
  };

  const timer = setTimeout(() => {
    reject(new Error("Server did't response within timeout"));
  }, connectionTimeout);

  socket.emit(event, data, (response) => {
    if (response.status === 'ok') {
      clearTimeout(timer);
      resolve((() => {
        console.log(getLogMessage(event), response);
        return response;
      })());
    } else {
      reject(
        new Error(`Server did't response within timeout. Trying event: ${event}`),
      );
    }
  });
});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
  socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload) => { dispatch(removeChannel(payload)); });
  socket.on('renameChannel', (payload) => { dispatch(renameChannel(payload)); });

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const socketProviderValue = {
    sendMessage: (data) => emitWithConnetionTimeout(socket, 'newMessage', data),
    addNewChannel: (data) => emitWithConnetionTimeout(socket, 'newChannel', data),
    removeChannel: (data) => emitWithConnetionTimeout(socket, 'removeChannel', data),
    renameChannel: (data) => emitWithConnetionTimeout(socket, 'renameChannel', data),
  };

  return (
    <SocketContext.Provider value={socketProviderValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
