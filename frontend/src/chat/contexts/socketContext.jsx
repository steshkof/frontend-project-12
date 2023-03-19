import { createContext, useEffect } from 'react';
import { addMessage } from '../slices/messagesSlice';
import { useDispatch } from 'react-redux';

const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
    
  socket.on('newMessage', (payload) => dispatch(addMessage(payload)));




  const socketProviderValue = {
    sendMessage: (value) => socket.emit('newMessage', value, (err, response) => {
      console.log(response);
      if(response?.status) {
        console.log('Ошибка отправки сообщения!', response?.status)
      }
    }),
  };

  return (
    <SocketContext.Provider value={socketProviderValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
