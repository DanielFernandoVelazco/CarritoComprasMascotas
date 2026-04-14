import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const BottomNavBar = () => {
    const location = useLocation();
    const { getCartCount } = useCart();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden z-50 rounded-t-2xl shadow-lg">
            <div className="flex justify-around items-center px-4 py-2">
                <Link to="/" className={`flex flex-col items-center py-2 px-4 rounded-full transition-colors ${isActive('/') ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}>
                    <span className="material-symbols-outlined">storefront</span>
                    <span className="text-[10px] font-semibold mt-1">Home</span>
                </Link>

                <Link to="/products" className={`flex flex-col items-center py-2 px-4 rounded-full transition-colors ${isActive('/products') ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}>
                    <span className="material-symbols-outlined">search</span>
                    <span className="text-[10px] font-semibold mt-1">Shop</span>
                </Link>

                <Link to="/cart" className={`flex flex-col items-center py-2 px-4 rounded-full transition-colors relative ${isActive('/cart') ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}>
                    <span className="material-symbols-outlined">shopping_bag</span>
                    {getCartCount() > 0 && (
                        <span className="absolute top-0 right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {getCartCount()}
            </span>
                    )}
                    <span className="text-[10px] font-semibold mt-1">Cart</span>
                </Link>

                <Link to="/orders" className={`flex flex-col items-center py-2 px-4 rounded-full transition-colors ${isActive('/orders') ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}>
                    <span className="material-symbols-outlined">receipt_long</span>
                    <span className="text-[10px] font-semibold mt-1">Orders</span>
                </Link>

                <Link to="/profile" className={`flex flex-col items-center py-2 px-4 rounded-full transition-colors ${isActive('/profile') ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}>
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-semibold mt-1">Profile</span>
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavBar;