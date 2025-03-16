import React from 'react';

const CartItem = ({ item, onRemove }) => {
  if (!item.productId) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(item.productId.price || 0);

  const formattedSubtotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format((item.productId.price || 0) * item.quantity);

  const mainImage = Array.isArray(item.productId.imageUrls) && item.productId.imageUrls.length > 0
    ? item.productId.imageUrls[0]
    : '/images/placeholder.jpg';

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <img 
        src={mainImage} 
        alt={item.productId.name} 
        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
        onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
      />
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <h3>{item.productId.name}</h3>
        <p>Price: {formattedPrice}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Subtotal: {formattedSubtotal}</p>
      </div>
      <button 
        onClick={() => onRemove(item.productId._id)} 
        style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;