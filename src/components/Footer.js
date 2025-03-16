import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Hiển thị nút khi trang được cuộn xuống
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    // Dọn dẹp event listener khi component bị hủy
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <footer id="colophon" className="site-footer">
      <div className="footer-main">
        <div className="wrap">
          <div className="footer-columns">
            {/* Column 1: Logo and Description */}
            <div className="footer-column">
              <div className="footer-logo">
                <img src="/images/diamond-icon.png" alt="Diamond icon" className="diamond-icon" />
              </div>
              <h3>Shopping Cart</h3>
              <p>
                Condimentum adipiscing vel neque dis nam parturient orci at scelerisque neque dis nam parturient.
              </p>
            </div>

            {/* Column 2: Payment Methods */}
            <div className="footer-column">
              <h3>We Accept</h3>
              <div className="payment-cards">
                <div className="card-row">
                  <img src="/images/payment/amex.png" alt="American Express" />
                  <img src="/images/payment/mastercard.png" alt="Mastercard" />
                  <img src="/images/payment/visa.png" alt="Visa" />
                  <img src="/images/payment/paypal.png" alt="PayPal" />
                </div>
                <div className="card-row">
                  <img src="/images/payment/diners.png" alt="Diners Club" />
                  <img src="/images/payment/stripe.png" alt="Stripe" />
                  <img src="/images/payment/jcb.png" alt="JCB" />
                </div>
              </div>
            </div>

            {/* Column 3: Shop Location */}
            <div className="footer-column shop-location-column">
              <h3>Shop Location</h3>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Themefreesia, Abc Building, 5th Floor, Zyz Street</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Download App */}
            <div className="footer-column download-app-column">
              <h3>Download App</h3>
              <div className="app-stores">
                <a href="https://play.google.com/store" className="app-button">
                  <img src="/images/google-play.png" alt="Google Play Store" />
                </a>
                <a href="https://www.apple.com/app-store/" className="app-button">
                  <img src="/images/app-store.png" alt="Apple App Store" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="wrap">
          <div className="social-links">
            <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" title="Pinterest"><i className="fab fa-pinterest-p"></i></a>
            <a href="#" title="Google Plus"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" title="Youtube"><i className="fab fa-youtube"></i></a>
            <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Go to Top Button - Thêm onClick và hiển thị có điều kiện */}
      {isVisible && (
        <button type="button" className="go-to-top" onClick={scrollToTop}>
          <i className="fas fa-angle-up"></i>
        </button>
      )}
    </footer>
  );
};

export default Footer;