import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(email, password);
    if (success) {
      navigate('/'); // Chuyển về trang chủ sau khi đăng nhập
    } else {
      alert('Login failed. Check your email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="diamond-particles"></div>
      <div className="login-card">
        <div className="brand-header">
          <div className="diamond-logo">
            <div className="diamond-inner"></div>
            <div className="diamond-sparkle"></div>
          </div>
          <h2 className="brand-title">Luxury Diamond Collection</h2>
          <p className="brand-tagline">Timeless Elegance, Exceptional Quality</p>
        </div>
        
        <h3 className="login-title">Member Access</h3>
        
        <form className="login-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your-email@example.com"
              />
              <span className="input-border"></span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <span className="input-border"></span>
            </div>
          </div>
          
          <button type="submit" className="login-button">
            <span>Sign In</span>
          </button>
          
          <div className="form-footer">
            <a href="#" className="footer-link">Forgot Password?</a>
            <a href="/register" className="footer-link">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;