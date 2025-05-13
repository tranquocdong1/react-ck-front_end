import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getOrders } from '../services/api';
import OrderItem from '../components/OrderItem';
import '../css/order.css';

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders(token);
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-heading">Order History</h1>
      {orders.length === 0 ? (
        <p className="no-orders-message">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
