import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Header.css';
import { searchProducts } from '../services/api';

const Header = () => {
  const { token, user, handleLogout } = useContext(AuthContext); // Lấy token, user, handleLogout
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Xử lý sự kiện tìm kiếm
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;

    try {
      setSearching(true);
      const results = await searchProducts(searchKeyword);
      setSearching(false);

      if (!results || results.length === 0) {
        alert(`Không tìm thấy sản phẩm phù hợp với từ khóa "${searchKeyword}"`);
        return;
      }

      navigate('/search-results', { state: { results, keyword: searchKeyword } });
    } catch (error) {
      console.error('Error searching products:', error);
      setSearching(false);
      alert('Đã xảy ra lỗi trong quá trình tìm kiếm. Vui lòng thử lại sau.');
    }
  };

  // Xử lý logout
  const handleLogoutClick = () => {
    handleLogout(); // Gọi hàm logout từ AuthContext
    alert('Đã đăng xuất thành công!');
    navigate('/'); // Chuyển hướng về trang chủ
  };

  return (
    <header id="masthead" className="site-header">
      <div className="header-wrap">
        {/* Top Header */}
        <div className="top-header">
          <div className="top-bar">
            <div className="wrap">
              <div className="contact-info">
                <a href="tel:+1234567890">
                  <i className="fa fa-phone"></i> (123) 456-7890
                </a>
                <a href="mailto:support@support.com">
                  <i className="fa fa-envelope"></i> support@support.com
                </a>
              </div>
              <div className="right-top-bar">
                <div className="social-links">
                  <ul>
                    <li><a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" title="Pinterest"><i className="fab fa-pinterest-p"></i></a></li>
                    <li><a href="#" title="Instagram"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#" title="Youtube"><i className="fab fa-youtube"></i></a></li>
                    <li><a href="#" title="Linkedin"><i className="fab fa-linkedin-in"></i></a></li>
                  </ul>
                </div>
                <div className="account-links">
                  {token ? (
                    <>
                      <span>Hello, {user?.username || 'User'}</span> {/* Hiển thị username */}
                      <button onClick={handleLogoutClick} className="logout-button">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="">Hello!!!</Link>
                      <Link to="/login">Login</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Site Branding */}
          <div id="site-branding">
            <div className="wrap">
              <Link to="/" className="custom-logo-link">
                <div className="logo">
                  <img src="/images/diamond-icon.png" alt="Diamond icon" className="diamond-icon" />
                </div>
              </Link>
              <div className="header-right">
                <div id="search-box">
                  <form className="search-form" onSubmit={handleSearch}>
                    <input
                      type="search"
                      className="search-field"
                      placeholder="Search products..."
                      name="s"
                      value={searchKeyword}
                      onChange={handleSearchChange}
                      disabled={searching}
                    />
                    <button type="submit" className="search-button" disabled={searching}>
                      {searching ? (
                        <i className="fa fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fa fa-search"></i>
                      )}
                    </button>
                  </form>
                </div>
                <div className="wishlist-box">
                  <a href="/wishlist" className="wishlist-link">
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
                <div className="cart-box">
                  <a href="/cart" className="cart-link">
                    <i className="fa fa-shopping-bag"></i>
                  </a>
                  <div className="cart-total"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div id="main-navigation">
            <div className="wrap">
              <nav className="primary-menu">
                <ul className="nav-menu">
                  <li className="menu-item"><a href="/">HOME</a></li>
                  <li className="menu-item"><a href="/product">PRODUCT</a></li>
                  <li className="menu-item"><a href="/wishlist">MY WISHLIST</a></li>
                  <li className="menu-item"><a href="/orders">ORDERS HISTORY</a></li>
                  <li className="menu-item"><a href="/blog">BLOG</a></li>
                  <li className="menu-item"><a href="/contactus">CONTACT US</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Thêm CSS cho nút Logout
const styles = `
  /* Các kiểu cũ giữ nguyên */
  .logout-button {
    background: linear-gradient(135deg, #ff6b6b, #ff8787);
    border: none;
    border-radius: 20px;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 16px;
    margin-left: 10px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .logout-button:hover {
    background: linear-gradient(135deg, #ff8787, #ff6b6b);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .logout-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .cart-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .cart-link {
    color: #ffffff;
    font-size: 18px;
    text-decoration: none;
  }
  
  .cart-box:hover {
    background: linear-gradient(135deg, #00f2fe, #4facfe);
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .cart-box:active {
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .wishlist-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .wishlist-link {
    color: #ffffff;
    font-size: 18px;
    text-decoration: none;
  }
  
  .wishlist-box:hover {
    background: linear-gradient(135deg, #fad0c4, #ff9a9e);
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .wishlist-box:active {
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .social-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
  }
  
  .social-links li {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    text-decoration: none;
    font-size: 16px;
    color: #ffffff;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .social-links a[href="#"][title="Facebook"] {
    background: linear-gradient(135deg, #3b5998, #5a82d1);
  }
  .social-links a[href="#"][title="Twitter"] {
    background: linear-gradient(135deg, #1da1f2, #4ab3f4);
  }
  .social-links a[href="#"][title="Pinterest"] {
    background: linear-gradient(135deg, #c8232c, #e74b52);
  }
  .social-links a[href="#"][title="Instagram"] {
    background: linear-gradient(135deg, #833ab4, #fd1d1d);
  }
  .social-links a[href="#"][title="Youtube"] {
    background: linear-gradient(135deg, #ff0000, #ff4d4d);
  }
  .social-links a[href="#"][title="Linkedin"] {
    background: linear-gradient(135deg, #0077b5, #00a0dc);
  }
  
  .social-links a:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .social-links a:active {
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .contact-info {
    display: flex;
    gap: 20px;
  }
  
  .contact-info a {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 25px;
    text-decoration: none;
    font-size: 14px;
    color: #ffffff;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .contact-info a[href^="tel"] {
    background: linear-gradient(135deg, #00c4cc, #36d8e0);
  }
  
  .contact-info a[href^="mailto"] {
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
  }
  
  .contact-info a i {
    margin-right: 6px;
    font-size: 16px;
  }
  
  .contact-info a:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #36d8e0, #00c4cc);
  }
  
  .contact-info a[href^="mailto"]:hover {
    background: linear-gradient(135deg, #feb47b, #ff7e5f);
  }
  
  .contact-info a:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .account-links span {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    border-radius: 20px;
    color: #333;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .account-links span:hover {
    background: linear-gradient(135deg, #FFA500, #FFD700);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .account-links span:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Style mới cho thanh tìm kiếm */
  #search-box {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .search-form {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2); /* Gradient nền nhẹ */
    border-radius: 25px; /* Bo góc mềm mại */
    padding: 5px 10px; /* Khoảng đệm bên trong */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Bóng sâu hơn */
    transition: all 0.3s ease;
  }

  .search-form:hover {
    background: linear-gradient(135deg, #c3cfe2, #f5f7fa); /* Đảo gradient khi hover */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* Bóng lớn hơn */
  }

  .search-field {
    border: none;
    outline: none;
    background: transparent; /* Trong suốt để hòa với nền form */
    padding: 8px 12px;
    font-size: 14px;
    color: #333; /* Màu chữ đậm */
    width: 200px; /* Độ rộng cố định */
    border-radius: 20px 0 0 20px; /* Bo góc bên trái */
    transition: width 0.3s ease; /* Hiệu ứng mở rộng */
  }

  .search-field:focus {
    width: 250px; /* Mở rộng khi focus */
    background: rgba(255, 255, 255, 0.8); /* Nền trắng mờ khi focus */
  }

  .search-button {
    border: none;
    background: linear-gradient(135deg, #6a82fb, #fc5c7d); /* Gradient nút tìm kiếm */
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 0 20px 20px 0; /* Bo góc bên phải */
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-button:hover {
    background: linear-gradient(135deg, #fc5c7d, #6a82fb); /* Đảo gradient khi hover */
    transform: scale(1.1); /* Phóng to nhẹ */
  }

  .search-button:disabled {
    background: #ccc; /* Màu xám khi disabled */
    cursor: not-allowed;
    transform: none;
  }

  .search-button i {
    font-size: 16px; /* Kích thước icon */
    transition: transform 0.3s ease;
  }

  .search-button:hover i {
    transform: rotate(90deg); /* Icon xoay khi hover */
  }

  .search-button .fa-spinner {
    animation: spin 1s linear infinite; /* Hiệu ứng quay cho spinner */
  }

  /* Keyframes cho spinner */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Header;