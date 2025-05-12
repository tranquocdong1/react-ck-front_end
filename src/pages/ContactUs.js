// ContactUs.jsx
import React, { useState } from 'react';
import { FaComment, FaEnvelope, FaUser } from 'react-icons/fa';
import '../css/ContactUs.css';
import { submitContactForm } from '../services/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
      return;
    }

    try {
      setLoading(true);
      setSubmitStatus(null);
      await submitContactForm(formData);
      
      setSubmitStatus({ 
        success: true, 
        message: 'Tin nhắn của bạn đã được gửi thành công!' 
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`contact-us-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </div>
      
      <section className="contact-section">
        <div className="container">
          <h1 className="section-title">Liên Hệ Với Chúng Tôi</h1>
          
          <div className="contact-container">
            <div className="contact-info-map">
              <div className="section-card">
                <h2 className="section-heading">Thông Tin Liên Hệ</h2>
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>123 Đường ABC, Quận 1, TP.HCM</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <a href="tel:+842837465829">+84 283 746 5829</a>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:contact@company.com">contact@company.com</a>
                  </div>
                </div>
                
                <div className="social-media">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <div className="section-card">
                {submitStatus && (
                  <div className={submitStatus.success ? 'success-message' : 'error-message'}>
                    {submitStatus.message}
                  </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Họ và Tên *</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <FaUser className="input-icon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <FaEnvelope className="input-icon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Nội dung *</label>
                    <div className="input-wrapper">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <FaComment className="input-icon textarea-icon" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        Đang gửi... <i className="fas fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      'Gửi Tin Nhắn'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;