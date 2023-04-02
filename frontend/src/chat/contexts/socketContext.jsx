import { createContext } from 'react';
import { addMessage } from '../slices/messagesSlice';
import { addChannel, removeChannel } from '../slices/channelsSlice';
import { useDispatch } from 'react-redux';

const SocketContext = createContext({});

const connectionTimeout = 3000;
const emitWithConnetionTimeout = async (socket, event, data) => {
  return new Promise((resolve, reject) => {
    const logMessages = {
      newMessage: {
        success: 'Message sent. Server response:',
        error: "Server did't response within timeout",
      },
      newChannel: {
        success: 'Channel Added. Server response:',
        error: "Server did't response within timeout",
      },
      removeChannel: {
        success: 'Channel Removed. Server response:',
        error: "Server did't response within timeout",
      }
    };

    const timer = setTimeout(() => {
      reject(new Error("Server did't response within timeout"));
    }, connectionTimeout);

    socket.emit(event, data, (response) => {
      if (response.status === 'ok') {
        clearTimeout(timer);
        resolve((() => {
          console.log(logMessages[event].success, response);
          return response;
        })())      
      } else {
        reject(
          new Error(`${logMessages[event].error}. Trying event: ${event}`)
        );
      }
    });
  });
};

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
  socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload) => {dispatch(removeChannel(payload))});

  const socketProviderValue = {
    sendMessage: (data) => emitWithConnetionTimeout(socket, 'newMessage', data),
    addNewChannel: (data) => emitWithConnetionTimeout(socket, 'newChannel', data),
    removeChannel: (data) => emitWithConnetionTimeout(socket, 'removeChannel', data)
  };

  return (
    <SocketContext.Provider value={socketProviderValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
