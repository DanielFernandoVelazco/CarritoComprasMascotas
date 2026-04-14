import React, { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { productService } from '../services/productService';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = () => {
        if (activeCategory === 'all') return products;
        if (activeCategory === 'organic') return products.filter(p => p.organic);
        return products.filter(p => p.category === activeCategory);
    };

    const categories = [
        { id: 'all', name: 'All Products', icon: 'pets' },
        { id: 'Dogs', name: 'Dogs', icon: 'pets' },
        { id: 'Cats', name: 'Cats', icon: 'pets' },
        { id: 'organic', name: 'Organic', icon: 'eco' },
    ];

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl overflow-hidden mb-12">
                <div className="relative z-10 px-8 py-16 md:py-24 text-center md:text-left md:px-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                        Fueling Their{' '}
                        <span className="text-orange-600">Wild Spirit</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
                        Premium organic pet food and accessories crafted with love for your beloved companions.
                    </p>
                    <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                        Shop Now
                    </button>
                </div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Categories */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
                <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                                activeCategory === category.id
                                    ? 'bg-orange-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {activeCategory === 'all' && 'Featured Products'}
                    {activeCategory === 'Dogs' && 'For Your Canine Companion'}
                    {activeCategory === 'Cats' && 'For Your Feline Friend'}
                    {activeCategory === 'organic' && 'Organic & Natural'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts().map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-green-600 text-3xl">eco</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">100% Sustainably Sourced</h3>
                    <p className="text-gray-600 text-sm">All ingredients are ethically sourced from trusted partners.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-blue-600 text-3xl">health_and_safety</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Vet Recommended</h3>
                    <p className="text-gray-600 text-sm">Formulated by leading nutritionists and veterinarians.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-purple-600 text-3xl">local_shipping</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
                    <p className="text-gray-600 text-sm">Free delivery on orders over $50.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;