import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import '../css/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Thêm state cho bộ lọc giá
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 1000 });
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProducts();
        console.log('API Response:', data); // Debug log
        
        // Đảm bảo data là mảng
        const productsArray = Array.isArray(data) ? data : [];
        
        setProducts(productsArray);
        
        // Trích xuất các danh mục duy nhất
        const uniqueCategories = [...new Set(productsArray
          .filter(p => p.category)
          .map(p => p.category))];
        setCategories(uniqueCategories);
        
        // Xác định phạm vi giá dựa trên sản phẩm
        if (productsArray.length > 0) {
          const prices = productsArray.map(p => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceRange({ min: minPrice, max: maxPrice });
          setCurrentPriceRange({ min: minPrice, max: maxPrice });
        }
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo danh mục và giá
  const filteredProducts = products
    .filter(product => !selectedCategory || product.category === selectedCategory)
    .filter(product => product.price >= priceRange.min && product.price <= priceRange.max);

  // Xử lý thay đổi thanh trượt giá
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setCurrentPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Xử lý nút Filter
  const applyPriceFilter = () => {
    setPriceRange(currentPriceRange);
    setShowPriceFilter(false); // Đóng bộ lọc sau khi áp dụng
  };

  // Toggle hiển thị bộ lọc giá
  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  // Xử lý khi click ra ngoài để đóng bộ lọc giá
  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterContainer = document.querySelector('.price-filter-container');
      if (filterContainer && !filterContainer.contains(event.target) && showPriceFilter) {
        setShowPriceFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPriceFilter]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading">Loading products...</div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error">Error: {error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="filters-section">
        {/* Top filters row - always visible */}
        <div className="filters-control-row">
          {categories.length > 0 && (
            <div className="category-filter">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value="">All Products</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          )}
          
          {/* Bộ lọc giá */}
          <div className="price-filter-container">
            <button 
              onClick={togglePriceFilter}
              className="price-filter-button"
            >
              Filter by Price
            </button>
            
            {showPriceFilter && (
              <div className="price-range-slider">
                <div className="price-inputs">
                  <div>
                    <label>Min Price:</label>
                    <input
                      type="number"
                      value={currentPriceRange.min}
                      onChange={(e) => handlePriceChange(e, 'min')}
                    />
                  </div>
                  <div>
                    <label>Max Price:</label>
                    <input
                      type="number"
                      value={currentPriceRange.max}
                      onChange={(e) => handlePriceChange(e, 'max')}
                    />
                  </div>
                </div>
                
                <div className="sliders">
                  <label>Price Range:</label>
                  <div className="flex items-center gap-2">
                    <span>{currentPriceRange.min}</span>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={currentPriceRange.min}
                      onChange={(e) => handlePriceChange(e, 'min')}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={currentPriceRange.max}
                      onChange={(e) => handlePriceChange(e, 'max')}
                      className="w-full"
                    />
                    <span>{currentPriceRange.max}</span>
                  </div>
                </div>
                
                <button 
                  onClick={applyPriceFilter}
                  className="apply-filter-button"
                >
                  Apply Filter
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Active filters row - hiển thị riêng biệt */}
        {(selectedCategory || priceRange.min !== currentPriceRange.min || priceRange.max !== currentPriceRange.max) && (
          <div className="active-filters-row">
            <div className="applied-filters">
              <span className="filter-label">Filtered by:</span>
              {selectedCategory && <span className="filter-tag">Category: {selectedCategory}</span>}
              {(priceRange.min > currentPriceRange.min || priceRange.max < currentPriceRange.max) && (
                <span className="filter-tag">Price: ${priceRange.min} - ${priceRange.max}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products available with the selected filters.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;