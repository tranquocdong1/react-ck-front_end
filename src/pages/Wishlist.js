import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWishlist, removeFromWishlist } from '../services/api';
import WishlistItem from '../components/WishlistItem';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { token } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await getWishlist(token);
        setWishlist(res.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (token) fetchWishlist();
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist({ productId }, token);
      setWishlist(wishlist.filter(item => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (loading) return (
    <div className="wishlist-loading-container">
      <div className="wishlist-loading">
        <div className="wishlist-loading-spinner"></div>
        <p>Loading your wishlist...</p>
      </div>
    </div>
  );

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="wishlist-title">My Wishlist</h1>
      </div>
      
      <div className="wishlist-count-container">
        <p className="wishlist-count">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
      </div>
      
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">❤</div>
          <p className="empty-wishlist-message">Your wishlist is empty</p>
          <p className="empty-wishlist-suggestion">Browse our products and add your favorites to your wishlist</p>
          <Link to="/product" className="shop-now-button">Shop Now</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <WishlistItem 
              key={item._id} 
              item={item} 
              onRemove={() => handleRemove(item._id)} 
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .wishlist-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .wishlist-header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }

        .wishlist-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #333;
          text-align: center;
        }

        .wishlist-count-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e1e1e1;
        }

        .wishlist-count {
          font-size: 1rem;
          color: #666;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .wishlist-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .empty-wishlist {
          text-align: center;
          padding: 4rem 1rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .empty-wishlist-icon {
          font-size: 3rem;
          color: #e0e0e0;
          margin-bottom: 1rem;
        }

        .empty-wishlist-message {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .empty-wishlist-suggestion {
          color: #666;
          margin-bottom: 2rem;
        }

        .shop-now-button {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          font-weight: 500;
          padding: 0.75rem 2rem;
          border-radius: 0.375rem;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .shop-now-button:hover {
          background-color: #2563eb;
        }

        .wishlist-loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }

        .wishlist-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wishlist-loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #3b82f6;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Wishlist;