import React from 'react';
import { Link } from 'react-router-dom';

const WishlistItem = ({ item, onRemove }) => {
  return (
    <div className="wishlist-item">
      <div className="wishlist-item-image">
        {item.imageUrls && item.imageUrls.length > 0 ? (
          <img 
            src={item.imageUrls[0]} 
            alt={item.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        ) : (
          <img src="/images/placeholder.jpg" alt={item.name} />
        )}
      </div>
      
      <div className="wishlist-item-content">
        <Link to={`/product/${item._id}`} className="wishlist-item-name">
          {item.name}
        </Link>
        
        <div className="wishlist-item-price">
          {new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
          }).format(item.price)}
        </div>
        
        {item.category && (
          <div className="wishlist-item-category">
            <span>Category:</span> {item.category}
          </div>
        )}
        
        <div className="wishlist-item-actions">
          <Link to={`/product/${item._id}`} className="view-product-button">
            View Details
          </Link>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      </div>

      <style jsx>{`
        .wishlist-item {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          background-color: white;
        }

        .wishlist-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .wishlist-item-image {
          height: 200px;
          overflow: hidden;
        }

        .wishlist-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .wishlist-item:hover .wishlist-item-image img {
          transform: scale(1.05);
        }

        .wishlist-item-content {
          padding: 1.25rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .wishlist-item-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          text-decoration: none;
        }

        .wishlist-item-name:hover {
          color: #3b82f6;
        }

        .wishlist-item-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 0.75rem;
        }

        .wishlist-item-category {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .wishlist-item-category span {
          color: #999;
        }

        .wishlist-item-actions {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .view-product-button {
          flex: 1;
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb); /* Gradient xanh nhạt */
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          text-align: center;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .view-product-button:hover {
          background: linear-gradient(135deg, #c2e9fb, #a1c4fd); /* Đảo gradient */
        }

        .remove-button {
          flex: 1;
          background-color: transparent;
          color: #ef4444;
          border: 1px solid #ef4444;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        .remove-button:hover {
          background-color: #ef4444;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default WishlistItem;