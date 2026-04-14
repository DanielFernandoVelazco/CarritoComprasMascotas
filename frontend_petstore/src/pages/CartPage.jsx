import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPage = () => {
    const { cartItems, loading, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            await removeFromCart(itemId);
        } else {
            await updateQuantity(itemId, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
    };

    if (loading) return <LoadingSpinner />;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-lg p-12 shadow-md">
                    <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">shopping_cart</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <Link
                        to="/products"
                        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-gray-600 mt-1">You have {cartItems.length} item(s) in your cart.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-8 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4 shadow-md">
                            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{item.productName}</h3>
                                        <p className="text-gray-500 text-sm">${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:text-orange-600 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">remove</span>
                                        </button>
                                        <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center hover:text-orange-600 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </button>
                                    </div>
                                    <span className="text-xl font-bold text-orange-600">${item.subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link
                        to="/products"
                        className="inline-flex items-center text-orange-600 font-semibold hover:gap-2 transition-all mt-4"
                    >
                        <span className="material-symbols-outlined mr-2">arrow_back</span>
                        Continue Shopping
                    </Link>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Estimated Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-xl font-bold">Total</span>
                                <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-orange-600 text-white font-bold py-4 rounded-full hover:bg-orange-700 transition-colors active:scale-95 flex items-center justify-center gap-2"
                        >
                            Proceed to Checkout
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            <span>Secure SSL Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;