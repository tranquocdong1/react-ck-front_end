import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Checkout from './pages/Checkout';

// Layout cho các trang chính có Header và Footer
const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Nơi các component con sẽ được render */}
      </main>
      <Footer />
    </>
  );
};

// Layout cho trang đăng nhập/đăng ký không có Header và Footer
const AuthLayout = () => {
  return (
    <main className="full-height">
      <Outlet /> {/* Nơi các component con sẽ được render */}
    </main>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="app-container">
        <Routes>
          {/* Các route đăng nhập/đăng ký không có Header/Footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Các route chính có Header/Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;