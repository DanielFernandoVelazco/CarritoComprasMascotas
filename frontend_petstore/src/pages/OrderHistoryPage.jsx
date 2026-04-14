import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await orderService.getUserOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'PROCESSING':
                return 'bg-blue-100 text-blue-800';
            case 'SHIPPED':
                return 'bg-purple-100 text-purple-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <LoadingSpinner />;

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-lg p-12 shadow-md">
                    <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">receipt_long</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                    <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                    <Link
                        to="/products"
                        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Get the most recent order (first in the list)
    const recentOrder = orders[0];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
                <p className="text-gray-600 mt-1">View and track all your sanctuary purchases</p>
            </div>

            {/* Active/Recent Order Highlight */}
            {recentOrder && (
                <div className="bg-gray-50 rounded-xl overflow-hidden mb-12">
                    <div className="bg-white rounded-lg p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                                {recentOrder.items[0] && (
                                    <img
                                        src={recentOrder.items[0].productImage}
                                        alt={recentOrder.items[0].productName}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${getStatusColor(recentOrder.status)}`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${recentOrder.status === 'SHIPPED' ? 'bg-purple-600' : 'bg-green-600'}`}></span>
                      {recentOrder.status}
                  </span>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start flex-wrap gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Order #{recentOrder.orderNumber}</p>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {recentOrder.items.length} {recentOrder.items.length === 1 ? 'Item' : 'Items'}
                                        </h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                        <p className="text-2xl font-bold text-orange-600">${recentOrder.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 my-4 border-y border-gray-200">
                                    <div>
                                        <p className="text-xs uppercase text-gray-500 mb-1">Date</p>
                                        <p className="font-medium">{new Date(recentOrder.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-gray-500 mb-1">Items</p>
                                        <p className="font-medium">{recentOrder.items.length} products</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-gray-500 mb-1">Payment</p>
                                        <p className="font-medium">{recentOrder.paymentMethod}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                                        Track Order
                                    </button>
                                    <Link
                                        to="/products"
                                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Shop Again
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Past Orders List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Past Orders</h3>

                {orders.slice(1).map((order) => (
                    <div key={order.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                {order.items[0] && (
                                    <img
                                        src={order.items[0].productImage}
                                        alt={order.items[0].productName}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <p className="text-xs uppercase text-gray-500 font-bold">Order ID</p>
                                    <p className="font-bold text-gray-900 text-sm">{order.orderNumber}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500 font-bold">Placed On</p>
                                    <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500 font-bold">Total</p>
                                    <p className="font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-500 font-bold">Status</p>
                                    <span className={`inline-flex items-center gap-1 text-sm font-bold ${order.status === 'DELIVERED' ? 'text-green-600' : 'text-orange-600'}`}>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        {order.status}
                  </span>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full md:w-auto">
                                <button className="flex-1 md:flex-none border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full hover:bg-gray-50 transition-colors text-sm">
                                    Order Again
                                </button>
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;