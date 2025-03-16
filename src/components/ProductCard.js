import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Kiểm tra xem product có tồn tại không
  if (!product) {
    console.error('Product is undefined or null');
    return null;
  }

  console.log('Product in ProductCard:', product); // Log để debug

  // Lấy ảnh chính hoặc sử dụng ảnh mặc định
  const mainImage = 
    product.imageUrls && 
    Array.isArray(product.imageUrls) && 
    product.imageUrls.length > 0 
      ? product.imageUrls[0] 
      : '/images/placeholder.jpg';

  // Format giá tiền
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(product.price || 0);

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-image">
          <img src={mainImage} alt={product.name} onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder.jpg';
          }} />
        </div>
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;