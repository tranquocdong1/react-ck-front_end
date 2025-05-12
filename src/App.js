import React from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import AuthProvider from './context/AuthContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';



// Layout cho các trang chính có Header và Footer
const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
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
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;