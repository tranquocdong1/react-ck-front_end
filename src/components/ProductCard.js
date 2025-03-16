import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addToCart } from '../services/api';

const ProductCard = ({ product }) => {
  // Gọi useContext ngay từ đầu, không có điều kiện
  const { token } = useContext(AuthContext);

  // Kiểm tra product có tồn tại không (sau khi gọi hook)
  if (!product) {
    console.error('Product is undefined or null');
    return null;
  }

  console.log('Product in ProductCard:', product);

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

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!token) {
      alert('Please login first');
      return;
    }
    try {
      await addToCart({ productId: product._id, quantity: 1 }, token);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-image">
          <img
            src={mainImage}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">{formattedPrice}</p>
        <button onClick={handleAddToCart} className="btn-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;