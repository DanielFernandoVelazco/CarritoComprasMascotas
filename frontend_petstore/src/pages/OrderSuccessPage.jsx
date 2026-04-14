import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderSuccessPage = () => {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrder();
    }, [orderNumber]);

    const loadOrder = async () => {
        try {
            const data = await orderService.getOrderByNumber(orderNumber);
            setOrder(data);
        } catch (error) {
            console.error('Error loading order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!order) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-green-50 p-8 text-center border-b border-green-100">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                            <span className="material-symbols-outlined text-white text-4xl">check_circle</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Your pet's treats are on the way!
                        </p>
                    </div>

                    {/* Order Info */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                <p className="text-xl font-bold text-gray-900">{order.orderNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-gray-200 pt-6 mb-6">
                            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-bold">{item.productName}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-orange-600 font-bold">${item.subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="border-t border-gray-200 pt-6 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                                <span>Total Paid</span>
                                <span className="text-orange-600">${order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-orange-600">local_shipping</span>
                                <h4 className="font-bold">Shipping To</h4>
                            </div>
                            <p className="text-gray-700">{order.shippingAddress}</p>
                            <p className="text-sm text-gray-500 mt-2">Payment: {order.paymentMethod}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Link
                                to="/products"
                                className="flex-1 text-center bg-orange-600 text-white font-bold py-3 rounded-full hover:bg-orange-700 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                to="/orders"
                                className="flex-1 text-center border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-50 transition-colors"
                            >
                                View All Orders
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Help Card */}
                <div className="mt-8 bg-orange-50 rounded-xl p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Need a hand?</h3>
                    <p className="text-gray-600 mb-4">Our pet care experts are available 24/7 to help with your order.</p>
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                        Chat with Care Team
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;