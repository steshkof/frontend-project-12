import { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const authContextProviderValue = {
    loggedIn: !!user?.token,
    user,
    logIn: (data) => logIn(data),
    logOut,
    getAuthHeader: () => (user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
  };

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
