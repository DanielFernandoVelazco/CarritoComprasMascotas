import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNavBar from './components/layout/BottomNavBar';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  return (
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow pb-20 md:pb-0">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/products" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                      path="/checkout"
                      element={
                        <PrivateRoute>
                          <CheckoutPage />
                        </PrivateRoute>
                      }
                  />
                  <Route
                      path="/order-success/:orderNumber"
                      element={
                        <PrivateRoute>
                          <OrderSuccessPage />
                        </PrivateRoute>
                      }
                  />
                  <Route
                      path="/orders"
                      element={
                        <PrivateRoute>
                          <OrderHistoryPage />
                        </PrivateRoute>
                      }
                  />
                </Routes>
              </main>
              <Footer />
              <BottomNavBar />
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
  );
}

export default App;