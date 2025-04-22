import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/ContactUs.css';
import { submitContactForm } from '../services/api';

const ContactUs = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please login to submit the contact form.');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitContactForm(formData, token);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-page" role="main">
      <section className="contact-section" aria-labelledby="contact-title">
        <div className="container">
          <h2 id="contact-title" className="section-title">
            Contact Us
          </h2>
          <div className="contact-container">
            {/* Thông tin liên hệ và Google Map */}
            <div className="contact-info-map">
              <div className="section-card">
                <h3 className="section-heading">Get in Touch</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Số 135, Đường Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận I, Thành phố Hồ Chí Minh</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone-alt"></i>
                    <a href="tel:+84123456789">+84 123 456 789</a>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:info@company.com">info@company.com</a>
                  </div>
                </div>
                <div className="social-media">
                  <a href="https://tiktok.com/@company" target="_blank" aria-label="TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                  <a href="https://t.me/company" target="_blank" aria-label="Telegram">
                    <i className="fab fa-telegram-plane"></i>
                  </a>
                  <a href="https://litmatch.com/company" target="_blank" aria-label="Litmatch">
                    <i className="fas fa-heart"></i>
                  </a>
                </div>
              </div>
              <div className="section-card">
                <h3 className="section-heading">Our Location</h3>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447013656012!2d106.698089414623!3d10.776389392319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f8b8d16d%3A0x6d8b8e8b8f8b8f8!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Company Location"
                  ></iframe>
                </div>
              </div>
              <div className="section-card">
                <h3 className="section-heading">Business Hours</h3>
                <div className="business-hours">
                  <div className="hours-list">
                    <div className="hours-item">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Saturday</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="hours-item">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Form liên hệ */}
            <div className="contact-form-container section-card">
              {success && (
                <div className="success-message" role="alert" aria-live="polite">
                  Your message has been sent successfully!
                </div>
              )}
              {error && (
                <div className="error-message" role="alert" aria-live="assertive">
                  {error}
                </div>
              )}
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                aria-describedby="form-description"
              >
                <p id="form-description" className="sr-only">
                  Fill out the form below to contact us.
                </p>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your message"
                    rows="6"
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <button className="dark-mode-toggle" aria-label="Toggle dark mode">
        <i className="fas fa-moon"></i>
      </button>
    </div>
  );
};

export default ContactUs;