import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;