import axios from 'axios';

// Đổi tên biến từ API thành api để phù hợp với cách sử dụng
const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// Lấy danh sách sản phẩm
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

// Lấy sản phẩm theo danh mục
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category "${category}":`, error);
    throw error;
  }
};

// Lấy danh sách sản phẩm liên quan
export const getRelatedProducts = async (category) => {
  try {
    const response = await api.get(`/products/related/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching related products for category "${category}":`, error);
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
export const getOrders = (token) =>
  api.get('/orders', { headers: { Authorization: `Bearer ${token}` } });
export const createOrder = (data, token) =>
  api.post('/orders', data, { headers: { Authorization: `Bearer ${token}` } });
export const getWishlist = (token) =>
  api.get('/wishlist', { headers: { Authorization: `Bearer ${token}` } });
export const addToWishlist = (data, token) =>
  api.post('/wishlist/add', data, { headers: { Authorization: `Bearer ${token}` } });
export const removeFromWishlist = (data, token) =>
  api.delete('/wishlist/remove', { data }, { headers: { Authorization: `Bearer ${token}` } });

// Export biến api để có thể sử dụng ở nơi khác nếu cần
export default api;
