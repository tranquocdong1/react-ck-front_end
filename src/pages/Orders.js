import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getOrders } from '../services/api';
import OrderItem from '../components/OrderItem';

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders(token);
      setOrders(res.data);
    };
    if (token) fetchOrders();
  }, [token]);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default Orders;