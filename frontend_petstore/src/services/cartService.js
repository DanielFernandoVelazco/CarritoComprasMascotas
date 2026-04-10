import api from './api';

export const cartService = {
    async getCart() {
        const response = await api.get('/cart');
        return response.data;
    },

    async addToCart(productId, quantity) {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    async updateQuantity(itemId, quantity) {
        const response = await api.put(`/cart/${itemId}?quantity=${quantity}`);
        return response.data;
    },

    async removeFromCart(itemId) {
        await api.delete(`/cart/${itemId}`);
    },

    async clearCart() {
        await api.delete('/cart');
    },
};