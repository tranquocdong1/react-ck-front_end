const OrderItem = ({ order }) => {
    return (
      <div>
        <h3>Order #{order._id}</h3>
        <p>Name: {order.fullName}</p>
        <p>Address: {order.address}</p>
        <p>PaymentMethod: {order.paymentMethod}</p>
        <p>Total: ${order.totalPrice}</p>
        <p>Status: {order.status}</p>
      </div>
    );
  };
  
  export default OrderItem;