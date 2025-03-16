import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/SearchResults.css'; // Bạn cần tạo file CSS này

const SearchResults = () => {
  const location = useLocation();
  const { results, keyword } = location.state || { results: [], keyword: '' };

  // Format price to GBP
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price || 0);
  };

  // Function to truncate description text
  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="search-results-page">
      <div className="container">
        <h1 className="page-title">Search result: "{keyword}"</h1>
        
        {results.length === 0 ? (
          <div className="no-results">
            <p>No products were found matching the keyword "{keyword}"</p>
            <Link to="/" className="btn btn-primary">Quay lại trang chủ</Link>
          </div>
        ) : (
          <>
            <p className="results-count">Find {results.length} products</p>
            <div className="products-grid">
              {results.map((product) => (
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
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.name || 'Unnamed Product'}</h3>
                    <p className="product-price">{formatPrice(product.price)}</p>
                    <p className="product-description">{truncateDescription(product.description)}</p>
                    <div className="product-actions">
                      <Link to={`/product/${product._id}`} className="btn btn-view">
                        View details
                      </Link>
                      <button className="btn btn-cart">Add to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;