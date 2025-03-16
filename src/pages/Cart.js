import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCart, removeFromCart } from '../services/api';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        try {
          const res = await getCart(token);
          console.log('Cart data from API:', res.data);
          setCart(res.data);
        } catch (err) {
          console.error('Error fetching cart:', err);
        }
      }
      setLoading(false);
    };
    fetchCart();
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart({ productId }, token);
      const res = await getCart(token);
      setCart(res.data);
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    if (item.productId && typeof item.productId.price === 'number') {
      return sum + item.productId.price * item.quantity;
    }
    return sum;
  }, 0);

  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(totalPrice);

  if (!token) {
    return (
      <div style={{ textAlign: 'center', margin: '50px' }}>
        <h1>Please login to view your cart</h1>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/product">Shop now</Link></p>
      ) : (
        <>
          {cart.map((item, index) => (
            item.productId ? (
              <CartItem 
                key={`${item.productId._id}-${index}`}
                item={item} 
                onRemove={handleRemove} 
              />
            ) : null
          ))}
          <h3>Total: {formattedTotal}</h3>
          <Link to="/checkout" style={{ display: 'inline-block', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none' }}>
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;