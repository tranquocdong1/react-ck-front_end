import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getCart } from '../services/api';

const Checkout = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
    paymentMethod: 'card'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        try {
          const res = await getCart(token);
          setCart(res.data);
        } catch (err) {
          console.error('Error fetching cart:', err);
        }
      }
      setLoading(false);
    };
    fetchCart();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would add the logic to submit the order
    // For example: await createOrder({ ...formData, items: cart, shippingFee }, token);
    alert('Order placed successfully!');
    navigate('/order-confirmation');
  };

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => {
    if (item.productId && typeof item.productId.price === 'number') {
      return sum + item.productId.price * item.quantity;
    }
    return sum;
  }, 0);

  // Calculate shipping fee as 10% of subtotal (adjustable)
  const shippingPercentage = 0.05; // 10% shipping fee
  const shippingFee = subtotal * shippingPercentage;

  // Calculate total including shipping
  const totalPrice = subtotal + shippingFee;

  const formattedSubtotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(subtotal);

  const formattedShipping = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(shippingFee);

  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(totalPrice);

  if (!token) {
    return (
      <div className="login-prompt">
        <h1>Please login to proceed with checkout</h1>
        <Link to="/login" className="login-button">Go to Login</Link>
        <style jsx>{`
          .login-prompt {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          .login-prompt h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #2d3748;
          }
          .login-button {
            background: #4299e1;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 6px;
            text-decoration: none;
            transition: background 0.3s ease;
          }
          .login-button:hover {
            background: #2b6cb0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1 className="checkout-title">Checkout</h1>
        
        {loading ? (
          <div className="loading">Loading your order details...</div>
        ) : cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/product" className="browse-button">Browse Our Collection</Link>
          </div>
        ) : (
          <div className="checkout-grid">
            {/* Order Summary Section */}
            <div className="order-summary-card">
              <h2 className="section-title">Order Summary</h2>
              
              <div className="cart-items">
                {cart.map((item, index) => (
                  item.productId ? (
                    <div key={`${item.productId._id}-${index}`} className="cart-item">
                      <div className="cart-item-image">
                        <img 
                          src={item.productId.imageUrls?.[0] || '/api/placeholder/80/80'} 
                          alt={item.productId.name}
                        />
                      </div>
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{item.productId.name}</h3>
                        <div className="cart-item-info">
                          <span className="cart-item-quantity">Quantity: {item.quantity}</span>
                          <span className="cart-item-price">
                            {new Intl.NumberFormat('en-GB', {
                              style: 'currency',
                              currency: 'GBP',
                            }).format(item.productId.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
              
              <div className="total-section">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>{formattedSubtotal}</span>
                </div>
                <div className="total-row">
                  <span>Shipping (5%):</span>
                  <span>{formattedShipping}</span>
                </div>
                <div className="total-row total">
                  <span>Total:</span>
                  <span>{formattedTotal}</span>
                </div>
              </div>
            </div>
            
            {/* Checkout Form Section */}
            <div className="checkout-form-card">
              <h2 className="section-title">Shipping & Payment</h2>
              
              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-grid-three">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postcode" className="form-label">Postcode</label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="payment-section">
                  <h3 className="payment-title">Payment Method</h3>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                      />
                      <span>PayPal</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleInputChange}
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="payment-details">
                    <div className="form-group">
                      <label htmlFor="cardNumber" className="form-label">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="form-input"
                      />
                    </div>
                    <div className="form-grid-two">
                      <div className="form-group">
                        <label htmlFor="expiry" className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="123"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="button-group">
                  <Link to="/cart" className="return-link">Return to Cart</Link>
                  <button type="submit" className="submit-button">Complete Order</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .checkout-container {
          min-height: 100vh;
          padding: 2rem 1rem;
        }
        .checkout-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .checkout-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: #2d3748;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }
        .loading {
          text-align: center;
          font-size: 1.125rem;
          color: #4a5568;
        }
        .empty-cart {
          text-align: center;
          padding: 2.5rem 0;
        }
        .empty-cart p {
          font-size: 1.125rem;
          color: #4a5568;
          margin-bottom: 1rem;
        }
        .browse-button {
          background: #4299e1;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .browse-button:hover {
          background: #2b6cb0;
        }
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .order-summary-card,
        .checkout-form-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          transition: all 0.3s ease;
        }
        .order-summary-card:hover,
        .checkout-form-card:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        .cart-items {
          margin-bottom: 1.5rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #edf2f7;
          transition: background 0.2s ease;
        }
        .cart-item:hover {
          background: #f7fafc;
        }
        .cart-item-image {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background: #f7fafc;
        }
        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cart-item-details {
          margin-left: 1rem;
          flex-grow: 1;
        }
        .cart-item-name {
          font-size: 1.125rem;
          font-weight: 500;
          color: #2d3748;
        }
        .cart-item-info {
          display: flex;
          justify-content: space-between;
          margin-top: 0.25rem;
        }
        .cart-item-quantity,
        .cart-item-price {
          font-size: 0.875rem;
          color: #718096;
        }
        .cart-item-price {
          font-weight: 600;
        }
        .total-section {
          border-top: 2px solid #e2e8f0;
          padding-top: 1rem;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: #4a5568;
        }
        .total-row.total {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2d3748;
          padding-top: 0.5rem;
          border-top: 1px solid #e2e8f0;
        }
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .form-grid-three {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .form-grid-three {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          color: #2d3748;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }
        .payment-section {
          margin-top: 1.5rem;
        }
        .payment-title {
          font-size: 1.125rem;
          font-weight: 500;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .radio-label {
          display: flex;
          align-items: center;
          color: #4a5568;
          cursor: pointer;
        }
        .radio-label input {
          margin-right: 0.5rem;
          accent-color: #4299e1;
        }
        .payment-details {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 1rem;
          background: #f7fafc;
        }
        .form-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .button-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        .return-link {
          color: #4299e1;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .return-link:hover {
          color: #2b6cb0;
          text-decoration: underline;
        }
        .submit-button {
          background: #4299e1;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .submit-button:hover {
          background: #2b6cb0;
        }
        @media (max-width: 640px) {
          .checkout-title {
            font-size: 2rem;
          }
          .section-title {
            font-size: 1.5rem;
          }
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .cart-item-image {
            margin-bottom: 1rem;
          }
          .cart-item-details {
            margin-left: 0;
          }
          .button-group {
            flex-direction: column;
            gap: 1rem;
          }
          .submit-button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;