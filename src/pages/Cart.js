import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCart, addToCart } from '../services/api';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart(token);
      setCart(res.data);
    };
    if (token) fetchCart();
  }, [token]);

  const handleAddToCart = async (productId) => {
    await addToCart({ productId, quantity: 1 }, token);
    const res = await getCart(token);
    setCart(res.data);
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.map(item => (
        <CartItem key={item.productId._id} item={item} />
      ))}
    </div>
  );
};

export default Cart;