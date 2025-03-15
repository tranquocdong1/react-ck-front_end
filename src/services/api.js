import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const getCart = (token) => API.get('/cart', { headers: { Authorization: `Bearer ${token}` } });
export const addToCart = (data, token) => API.post('/cart/add', data, { headers: { Authorization: `Bearer ${token}` } });
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getOrders = (token) => API.get('/orders', { headers: { Authorization: `Bearer ${token}` } });
export const createOrder = (data, token) => API.post('/orders', data, { headers: { Authorization: `Bearer ${token}` } });
export const getWishlist = (token) => API.get('/wishlist', { headers: { Authorization: `Bearer ${token}` } });
export const addToWishlist = (data, token) => API.post('/wishlist/add', data, { headers: { Authorization: `Bearer ${token}` } });
export const removeFromWishlist = (data, token) => API.delete('/wishlist/remove', data, { headers: { Authorization: `Bearer ${token}` } });