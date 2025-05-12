import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWishlist, removeFromWishlist } from '../services/api';
import WishlistItem from '../components/WishlistItem';
import { Link } from 'react-router-dom';
import '../css/Wishlist.css';

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

    if (token) {
      fetchWishlist();
    } else {
      setLoading(false); // Không cần loading nếu chưa đăng nhập
    }
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist({ productId }, token);
      setWishlist(wishlist.filter(item => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (!token) {
    return (
      <div style={{ textAlign: 'center', margin: '50px' }}>
        <h1>Please login to view your wishlist</h1>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', margin: '50px' }}>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty. <Link to="/product">Add now</Link></p>
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
    </div>
  );
};

export default Wishlist;