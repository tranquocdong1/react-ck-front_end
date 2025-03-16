import { createContext, useState } from 'react';
import { login, register } from '../services/api';
import { useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Lưu token vào localStorage
    } else {
      localStorage.removeItem('token'); // Xóa khi logout
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const res = await login({ email, password });
      console.log('Login response:', res.data);
      setUser({ id: res.data.userId, username: res.data.username });
      setToken(res.data.token);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  // Đăng ký
  const handleRegister = async (username, email, password) => {
    try {
      await register({ username, email, password });
      return true; // Thành công
    } catch (err) {
      console.error('Register error:', err);
      return false; // Thất bại
    }
  };

  // Đăng xuất
  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;