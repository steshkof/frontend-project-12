import { useContext } from 'react';
import { AuthContext } from './authContext';
import { SocketContext } from './socketContext';

const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
