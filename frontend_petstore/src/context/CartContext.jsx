import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const loadCart = async () => {
        if (!user) {
            setCartItems([]);
            return;
        }

        setLoading(true);
        try {
            const items = await cartService.getCart();
            setCartItems(items);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, [user]);

    const addToCart = async (productId, quantity) => {
        if (!user) {
            return { success: false, error: 'Please login first' };
        }

        try {
            const item = await cartService.addToCart(productId, quantity);
            await loadCart();
            return { success: true, data: item };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to add to cart' };
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            await cartService.updateQuantity(itemId, quantity);
            await loadCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await cartService.removeFromCart(itemId);
            await loadCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCartItems([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.subtotal, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            getCartTotal,
            getCartCount,
            loadCart
        }}>
            {children}
        </CartContext.Provider>
    );
};