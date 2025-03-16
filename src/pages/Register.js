import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
  const { handleRegister } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const validatePassword = (pass, confirm) => {
    return pass === confirm;
  };

  const handleConfirmPassword = (e) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);
    setPasswordMatch(validatePassword(password, confirmValue));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordMatch) {
      alert('Mật khẩu không khớp!');
      return;
    }
    
    const success = await handleRegister(username, email, password);
    if (success) {
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } else {
      alert('Đăng ký thất bại. Email có thể đã tồn tại.');
    }
  };

  return (
    <div className="register-container">
      <div className="diamond-particles"></div>
      <div className="register-card">
        <div className="brand-header">
          <div className="diamond-logo">
            <div className="diamond-inner"></div>
            <div className="diamond-sparkle"></div>
          </div>
          <h2 className="brand-title">Luxury Diamond Collection</h2>
          <p className="brand-tagline">Trở thành thành viên đặc quyền</p>
        </div>
        
        <h3 className="register-title">Đăng Ký Tài Khoản</h3>
        
        <form className="register-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên người dùng</label>
            <div className="input-container">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Nhập tên của bạn"
              />
              <span className="input-border"></span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Địa chỉ Email</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
              />
              <span className="input-border"></span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className="input-container">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
                placeholder="••••••••"
                className={!passwordMatch ? "input-error" : ""}
              />
              <span className="input-border"></span>
            </div>
            {!passwordMatch && <p className="error-message">Mật khẩu không khớp</p>}
          </div>
          
          <button type="submit" className="register-button">
            <span>Tạo Tài Khoản</span>
          </button>
          
          <div className="form-footer">
            <p className="have-account">Đã có tài khoản?</p>
            <Link to="/login" className="footer-link">Đăng nhập ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;