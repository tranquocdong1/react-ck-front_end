const CartItem = ({ item }) => {
    return (
      <div>
        <h3>{item.productId.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>${item.productId.price * item.quantity}</p>
      </div>
    );
  };
  
  export default CartItem;