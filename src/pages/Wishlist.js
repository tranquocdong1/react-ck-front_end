import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/api';
import WishlistItem from '../components/WishlistItem';

const Wishlist = () => {
  const { token } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await getWishlist(token);
      setWishlist(res.data);
    };
    if (token) fetchWishlist();
  }, [token]);

  const handleAdd = async (productId) => {
    await addToWishlist({ productId }, token);
    const res = await getWishlist(token);
    setWishlist(res.data);
  };

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.map(item => (
        <WishlistItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Wishlist;