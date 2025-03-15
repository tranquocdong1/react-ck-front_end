const OrderItem = ({ order }) => {
    return (
      <div>
        <h3>Order #{order._id}</h3>
        <p>Total: ${order.total}</p>
        <p>Status: {order.status}</p>
      </div>
    );
  };
  
  export default OrderItem;