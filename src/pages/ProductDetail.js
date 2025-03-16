import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProduct, getRelatedProducts, addToCart, addToWishlist, getWishlist } from '../services/api'; // Added wishlist API functions
import '../css/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching product with ID:', id);
        const data = await getProduct(id);
        console.log('Product data:', data);

        setProduct(data);
        setCurrentImageIndex(0);

        if (data && data.category) {
          fetchRelatedProducts(data.category);
        }
        
        // Check if product is in wishlist
        if (token) {
          checkWishlistStatus();
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, token]);

  const checkWishlistStatus = async () => {
    try {
      const wishlistData = await getWishlist(token);
      // Check if this product is in the wishlist
      const isInList = wishlistData.data.some(item => item._id === id);
      setIsInWishlist(isInList);
    } catch (err) {
      console.error('Error checking wishlist status:', err);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      setRelatedLoading(true);
      console.log('Fetching related products for category:', category);
      const data = await getRelatedProducts(category);
      console.log('Related products data:', data);

      const filteredProducts = data.filter(item => item._id !== id);
      setRelatedProducts(filteredProducts.slice(0, 4));
    } catch (err) {
      console.error('Error fetching related products:', err);
    } finally {
      setRelatedLoading(false);
    }
  };

  const handleImageClick = (index) => {
    if (index > currentImageIndex) {
      setSlideDirection('slide-left');
    } else if (index < currentImageIndex) {
      setSlideDirection('slide-right');
    }

    setTimeout(() => {
      setCurrentImageIndex(index);
      setTimeout(() => {
        setSlideDirection('');
      }, 10);
    }, 10);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToPrevImage = () => {
    if (product?.imageUrls?.length > 1 && currentImageIndex > 0) {
      setSlideDirection('slide-right');

      setTimeout(() => {
        setCurrentImageIndex(prevIndex => prevIndex - 1);
        setTimeout(() => {
          setSlideDirection('');
        }, 10);
      }, 10);
    }
  };

  const goToNextImage = () => {
    if (product?.imageUrls?.length > 1 && currentImageIndex < product.imageUrls.length - 1) {
      setSlideDirection('slide-left');

      setTimeout(() => {
        setCurrentImageIndex(prevIndex => prevIndex + 1);
        setTimeout(() => {
          setSlideDirection('');
        }, 10);
      }, 10);
    }
  };

  const navigateToProduct = (productId) => {
    if (productId) {
      window.location.href = `/product/${productId}`;
    } else {
      console.error('Attempted to navigate to a product with undefined ID');
    }
  };

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!token) {
      alert('Please login to add products to your cart.');
      navigate('/login');
      return;
    }

    try {
      await addToCart({ productId: id, quantity }, token);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  // Add to wishlist handler
  const handleAddToWishlist = async () => {
    if (!token) {
      alert('Please login to add products to your wishlist.');
      navigate('/login');
      return;
    }

    // Don't add if already in wishlist
    if (isInWishlist) {
      alert('This product is already in your wishlist.');
      return;
    }

    try {
      setWishlistLoading(true);
      await addToWishlist({ productId: id }, token);
      setIsInWishlist(true);
      alert('Product added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add product to wishlist. Please try again.');
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="loading-container">
        <div className="loading">Loading product details...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="error-container">
        <div className="error">Error: {error}</div>
        <button className="back-button" onClick={goBack}>Back to Products</button>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-8">
      <div className="not-found-container">
        <div className="not-found">Product not found</div>
        <button className="back-button" onClick={goBack}>Back to Products</button>
      </div>
    </div>
  );

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(product.price);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="product-detail-container">
        <button className="back-button" onClick={goBack}>← Back</button>

        <div className="product-detail">
          <h1>{product.name}</h1>

          <div className="product-detail-content">
            <div className="product-images">
              <div className="main-image-container">
                <button
                  className="slider-nav prev-button"
                  onClick={goToPrevImage}
                  disabled={currentImageIndex === 0}
                >
                </button>

                <div className={`slider-container ${slideDirection}`}>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img
                      src={product.imageUrls[currentImageIndex]}
                      alt={product.name}
                      className="main-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  ) : (
                    <img
                      src="/images/placeholder.jpg"
                      alt={product.name}
                      className="main-image"
                    />
                  )}
                </div>

                <button
                  className="slider-nav next-button"
                  onClick={goToNextImage}
                  disabled={!product.imageUrls || currentImageIndex === product.imageUrls.length - 1}
                >
                  
                </button>
              </div>

              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="thumbnail-images">
                  {product.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => handleImageClick(index)}
                      className={currentImageIndex === index ? 'selected' : ''}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="product-price">{formattedPrice}</div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description || 'No description available'}</p>
              </div>

              <div className="product-category">
                <span>Category:</span> {product.category || 'Uncategorized'}
              </div>

              <div className="product-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>

                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                <button 
                  className={`add-to-wishlist ${isInWishlist ? 'in-wishlist' : ''}`}
                  onClick={handleAddToWishlist}
                  disabled={wishlistLoading || isInWishlist}
                >
                  {wishlistLoading ? 'Adding...' : isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="related-products-section">
            <h2>Related Products</h2>

            {relatedLoading ? (
              <div className="related-loading">Loading related products...</div>
            ) : relatedProducts.length > 0 ? (
              <div className="related-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct._id}
                    className="related-product-card"
                    onClick={() => navigateToProduct(relatedProduct._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="related-product-image">
                      <img
                        src={relatedProduct.imageUrls && relatedProduct.imageUrls.length > 0
                          ? relatedProduct.imageUrls[0]
                          : '/images/placeholder.jpg'
                        }
                        alt={relatedProduct.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="related-product-info">
                      <h3>{relatedProduct.name}</h3>
                      <div className="related-product-price">
                        {formatPrice(relatedProduct.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-related-products">
                No related products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;