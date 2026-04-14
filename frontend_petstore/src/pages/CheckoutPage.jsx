import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart, loading: cartLoading } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'credit_card'
    });

    if (cartLoading) return <LoadingSpinner />;

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;

        const result = await orderService.createOrder(shippingAddress, formData.paymentMethod);

        if (result) {
            await clearCart();
            navigate(`/order-success/${result.orderNumber}`);
        } else {
            alert('Error creating order. Please try again.');
        }

        setLoading(false);
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Form */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-orange-600">person</span>
                            </div>
                            <h2 className="text-xl font-bold">Contact Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-orange-600">local_shipping</span>
                            </div>
                            <h2 className="text-xl font-bold">Shipping Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-orange-600">payments</span>
                            </div>
                            <h2 className="text-xl font-bold">Payment Method</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'credit_card' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit_card"
                                    checked={formData.paymentMethod === 'credit_card'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <div className="flex flex-col items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-600">credit_card</span>
                                    <span className="text-sm font-semibold">Credit Card</span>
                                </div>
                            </label>

                            <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={formData.paymentMethod === 'paypal'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <div className="flex flex-col items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-500">account_balance_wallet</span>
                                    <span className="text-sm font-semibold">PayPal</span>
                                </div>
                            </label>
                        </div>

                        {formData.paymentMethod === 'credit_card' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-sm">{item.productName}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        <p className="font-bold text-orange-600">${item.subtotal.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-semibold text-green-600">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Estimated Tax</span>
                                <span className="font-semibold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-orange-600">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 text-white font-bold py-4 rounded-full hover:bg-orange-700 transition-colors active:scale-95 flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Complete Purchase'}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            <span>100% Secure Checkout with 256-bit Encryption</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;