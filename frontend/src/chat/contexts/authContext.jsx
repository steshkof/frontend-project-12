import { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const setUserData = (userData) => {
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
    else localStorage.removeItem('user');

    setUser(userData);
  };

  const authContextProviderValue = {
    loggedIn: !!user?.token,
    user,
    logIn: (data) => setUserData(data),
    logOut: () => setUserData(null),
    getAuthHeader: () => (user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
  };

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
