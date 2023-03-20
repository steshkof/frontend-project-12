import { createContext, useEffect } from 'react';
import { addMessage } from '../slices/messagesSlice';
import { useDispatch } from 'react-redux';

const SocketContext = createContext({});

const connectionTimeout = 3000; 
const emitWithConnetionTimeout = (socket, event, data) => {
  new Promise((resolve, reject) => {
    const logMessages = {
      newMessage: {
        success: "Message sent. Server response:",
        error: "Server did't response within timeout"
      }
    }

    const timer = setTimeout(() => {
      reject(new Error("Server did't response within timeout"))
    },connectionTimeout)

    socket.emit(event, data, (response) => {
      if (response.status === 'ok') {
        clearTimeout(timer);
        resolve(console.log(logMessages[event].success, response))
      } else {
        reject(new Error(`${logMessages[event].error}. Trying event: ${event}`))
      }
    });
  })
}

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => dispatch(addMessage(payload)));

  const socketProviderValue = {
    sendMessage: (data) => emitWithConnetionTimeout(socket, 'newMessage', data)
  };

  return (
    <SocketContext.Provider value={socketProviderValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
