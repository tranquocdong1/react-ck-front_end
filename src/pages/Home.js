import React, { useContext, useEffect, useRef, useState } from 'react'; // Thêm useContext
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import '../css/Home.css';
import { addToCart, getBestSellers, getNewProducts } from '../services/api';

const Home = () => {
  const { token } = useContext(AuthContext); // Lấy token từ AuthContext
  const navigate = useNavigate(); // Dùng để chuyển hướng
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const newProductsData = await getNewProducts();
        const bestSellersData = await getBestSellers();
        setNewProducts(newProductsData.slice(0, 6));
        setBestSellers(bestSellersData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const carouselImages = [
    { id: 1, src: '/images/carousel-1.jpg', alt: 'Carousel 1' },
    { id: 2, src: '/images/carousel-2.jpg', alt: 'Carousel 2' },
    { id: 3, src: '/images/carousel-3.jpg', alt: 'Carousel 3' },
  ];

  const smallImages = [
    { id: 1, src: '/images/small-1.jpg', alt: 'Small 1' },
    { id: 2, src: '/images/small-2.jpg', alt: 'Small 2' },
    { id: 3, src: '/images/small-3.jpg', alt: 'Small 3' },
  ];

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentSlide]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      handleNextSlide();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price || 0);
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async (productId) => {
    if (!token) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang login
      alert('Please login to add products to your cart.');
      navigate('/login');
      return;
    }

    try {
      await addToCart({ productId, quantity: 1 }, token);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div className="home-page">
      {/* Carousel Section */}
      <section className="carousel-section" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
        <div className="container carousel-container" ref={carouselRef}>
          <div className="carousel-inner">
            {carouselImages.map((image, index) => (
              <div
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                key={image.id}
                style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
              >
                <Link to="/product">
                  <img src={image.src} alt={image.alt} />
                </Link>
                <div className="carousel-content">
                  <h2>{image.title}</h2>
                  <p>{image.subtitle}</p>
                </div>
              </div>
            ))}

            <button className="carousel-btn prev" onClick={handlePrevSlide}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="carousel-btn next" onClick={handleNextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className="carousel-indicators">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Small Images Section */}
      <section className="small-images">
        <div className="container">
          <div className="small-images-grid">
            {smallImages.map((image) => (
              <Link to="/product" key={image.id} className="small-image-card">
                <img src={image.src} alt={image.alt} />
                <div className="small-image-overlay">
                  <h3>{image.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="new-products">
        <div className="container">
          <h2 className="section-title">New Products</h2>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="products-grid">
              {newProducts.length > 0 ? (
                newProducts.map((product) => (
                  <div className="product-card" key={product._id}>
                    <div className="product-image">
                      <img 
                        src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/images/placeholder.jpg'} 
                        alt={product.name || 'Product Image'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="product-tags">
                        <span className="tag new">New</span>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.name || 'Unnamed Product'}</h3>
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <p className="product-description">{truncateDescription(product.description)}</p>
                      <div className="product-actions">
                        <Link to={`/product/${product._id}`} className="btn btn-view">
                          View Details
                        </Link>
                        <button 
                          className="btn btn-cart" 
                          onClick={() => handleAddToCart(product._id)} // Gọi hàm handleAddToCart
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No new products available.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Large Image Below New Products */}
      <section className="large-image">
        <div className="container">
          <div className="promo-banner">
            <Link to="/product">
              <img src="/images/large-image.jpg" alt="Large Banner" className="large-image-banner" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers">
        <div className="container">
          <h2 className="section-title">Best Sellers</h2>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="products-grid">
              {bestSellers.length > 0 ? (
                bestSellers.map((product) => (
                  <div className="product-card" key={product._id}>
                    <div className="product-image">
                      <img 
                        src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/images/placeholder.jpg'} 
                        alt={product.name || 'Product Image'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="product-tags">
                        <span className="tag bestseller">BESTSELLER</span>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.name || 'Unnamed Product'}</h3>
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <p className="product-description">{truncateDescription(product.description)}</p>
                      <div className="product-actions">
                        <Link to={`/product/${product._id}`} className="btn btn-view">
                          View Details
                        </Link>
                        <button 
                          className="btn btn-cart" 
                          onClick={() => handleAddToCart(product._id)} // Gọi hàm handleAddToCart
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No bestsellers available.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;