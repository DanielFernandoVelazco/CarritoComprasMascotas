import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold text-orange-600 tracking-tighter">
                        The Digital Sanctuary
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</Link>
                        <Link to="/products" className="text-gray-700 hover:text-orange-600 transition-colors">Shop</Link>
                        <Link to="/orders" className="text-gray-700 hover:text-orange-600 transition-colors">Orders</Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link to="/cart" className="relative">
                            <span className="material-symbols-outlined text-gray-600">shopping_cart</span>
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">Hi, {user.firstName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-orange-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined">logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-600 hover:text-orange-600 transition-colors">
                                <span className="material-symbols-outlined">person</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;