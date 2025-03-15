import { createContext, useState } from 'react';
import { login, register } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async (email, password) => {
    const res = await login({ email, password });
    setUser({ id: res.data.userId });
    setToken(res.data.token);
  };

  const handleRegister = async (username, email, password) => {
    await register({ username, email, password });
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;