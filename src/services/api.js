import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// PRODUCTS APIs
// Lấy danh sách tất cả sản phẩm
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Lấy chi tiết sản phẩm theo ID
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Lấy danh sách sản phẩm liên quan theo category
export const getRelatedProducts = async (category) => {
  try {
    const response = await api.get(`/products/related/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching related products for category "${category}":`, error);
    throw error;
  }
};

// Lấy danh sách sản phẩm mới
export const getNewProducts = async () => {
  try {
    const response = await api.get('/products/home/new-products');
    return response.data;
  } catch (error) {
    console.error('Error fetching new products:', error);
    throw error;
  }
};

// Lấy danh sách sản phẩm best seller
export const getBestSellers = async () => {
  try {
    const response = await api.get('/products/home/best-sellers');
    return response.data;
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    throw error;
  }
};

// Lấy cả sản phẩm mới và best seller cho trang home
export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/home/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Tạo mới một sản phẩm
export const createProduct = async (data, token) => {
  try {
    const response = await api.post('/products', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (id, data, token) => {
  try {
    const response = await api.put(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id, token) => {
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái best seller
export const setBestSellerStatus = async (id, isBestSeller, token) => {
  try {
    const response = await api.put(
      `/products/${id}/set-bestseller`,
      { isBestSeller },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating bestseller status for product ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái sản phẩm mới
export const setNewProductStatus = async (id, isNewProduct, token) => {
  try {
    const response = await api.put(
      `/products/${id}/set-new-product`,
      { isNewProduct },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating new product status for product ${id}:`, error);
    throw error;
  }
};

// Cập nhật số lượng bán
export const updateSalesCount = async (id, salesCount, token) => {
  try {
    const response = await api.put(
      `/products/${id}/update-sales`,
      { salesCount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating sales count for product ${id}:`, error);
    throw error;
  }
};

// Tìm kiếm sản phẩm theo danh mục
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category "${category}":`, error);
    throw error;
  }
};

// Tìm kiếm sản phẩm theo từ khóa
export const searchProducts = async (keyword) => {
  try {
    const response = await api.get(`/products/search/${keyword}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching products with keyword "${keyword}":`, error);
    throw error;
  }
};

// Giữ nguyên các API khác (Cart, Auth, Orders, Wishlist) nhưng đổi API thành api
export const getCart = (token) =>
  api.get('/cart', { headers: { Authorization: `Bearer ${token}` } });
export const addToCart = (data, token) =>
  api.post('/cart/add', data, { headers: { Authorization: `Bearer ${token}` } });
export const removeFromCart = (data, token) =>
  api.delete('/cart/remove', {
    headers: { Authorization: `Bearer ${token}` },
    data: data
  });
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getUserInfo = (token) =>
  api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
export const getOrders = (token) =>
  api.get('/orders', { headers: { Authorization: `Bearer ${token}` } });
export const createOrder = (data, token) =>
  api.post('/orders', data, { headers: { Authorization: `Bearer ${token}` } });
export const getWishlist = (token) =>
  api.get('/wishlist', { headers: { Authorization: `Bearer ${token}` } });
export const addToWishlist = (data, token) =>
  api.post('/wishlist/add', data, { headers: { Authorization: `Bearer ${token}` } });
export const removeFromWishlist = (data, token) =>
  api.delete('/wishlist/remove', {
    headers: { Authorization: `Bearer ${token}` },
    data: data
  });

// Export biến api để có thể sử dụng ở nơi khác nếu cần
export default api;
