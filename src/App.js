import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Header from './components/Header'; // Adjust path if needed
import Footer from './components/Footer'; // We'll create this below
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

const App = () => (
  <AuthProvider>
    <Router>
      <div className="app-container">
        {/* Header appears on every page */}
        <Header />

        {/* Main content with routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>

        {/* Footer appears on every page */}
        <Footer />
      </div>
    </Router>
  </AuthProvider>
);

export default App;