import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { searchProducts } from '../services/api';
import '../css/Header.css';

const Header = () => {
  const { token, user, handleLogout } = useContext(AuthContext);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

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

  const handleLogoutClick = () => {
    handleLogout();
    alert('Đã đăng xuất thành công!');
    navigate('/');
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
                      <span>Hello, {user?.username || 'User'}</span>
                      <button onClick={handleLogoutClick} className="logout-button">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink to="">Hello!!!</NavLink>
                      <NavLink to="/login">Login</NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Site Branding */}
          <div id="site-branding">
            <div className="wrap">
              <NavLink to="/" className="custom-logo-link">
                <div className="logo">
                  <img src="/images/diamond-icon.png" alt="Diamond icon" className="diamond-icon" />
                </div>
              </NavLink>
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
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div id="main-navigation">
            <div className="wrap">
              <nav className="primary-menu">
                <ul className="nav-menu">
                  <li className="menu-item">
                    <NavLink to="/" exact activeClassName="active">HOME</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/product" activeClassName="active">PRODUCT</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/wishlist" activeClassName="active">MY WISHLIST</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/orders" activeClassName="active">ORDERS HISTORY</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/blog" activeClassName="active">BLOG</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/contact-us" activeClassName="active">CONTACT US</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
