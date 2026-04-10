import api from './api';

export const orderService = {
    async createOrder(shippingAddress, paymentMethod) {
        const response = await api.post('/orders', { shippingAddress, paymentMethod });
        return response.data;
    },

    async getUserOrders() {
        const response = await api.get('/orders');
        return response.data;
    },

    async getOrderByNumber(orderNumber) {
        const response = await api.get(`/orders/${orderNumber}`);
        return response.data;
    },
};