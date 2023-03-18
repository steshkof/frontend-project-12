import { useContext } from 'react';
import { AuthContext } from './authContext'

const useAuth = () => useContext(AuthContext);

export { useAuth };