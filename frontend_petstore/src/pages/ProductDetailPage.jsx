import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('5 lb');

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const data = await productService.getProductById(id);
            setProduct(data);
        } catch (error) {
            console.error('Error loading product:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        const result = await addToCart(product.id, quantity);
        if (result.success) {
            alert('Added to cart!');
        } else {
            alert(result.error);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!product) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="relative">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-[500px] object-cover"
                        />
                    </div>
                    {product.organic && (
                        <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Premium Organic
              </span>
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Best Seller
              </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-yellow-500">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                            ))}
                            <span className="material-symbols-outlined text-lg">star_half</span>
                        </div>
                        <span className="text-gray-500 text-sm">4.8 (124 reviews)</span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="text-green-600 font-semibold text-sm">In Stock</span>
                    </div>

                    <div className="mb-6">
                        <span className="text-4xl font-bold text-orange-600">${product.price}</span>
                        <p className="text-gray-500 text-sm mt-1">Price includes all applicable taxes and duties.</p>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Select Bag Size</label>
                        <div className="flex gap-3">
                            {['5 lb', '12 lb', '25 lb'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                                        selectedSize === size
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center hover:text-orange-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:text-orange-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-orange-600 text-white font-bold py-4 px-8 rounded-full hover:bg-orange-700 transition-colors active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">shopping_bag</span>
                            Add to Cart
                        </button>
                    </div>

                    {/* Features */}
                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600">eco</span>
                            </div>
                            <div>
                                <h4 className="font-bold">100% Sustainably Sourced</h4>
                                <p className="text-gray-500 text-sm">Our salmon is wild-caught ensuring the highest omega-3 content.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-600">health_and_safety</span>
                            </div>
                            <div>
                                <h4 className="font-bold">Vet Recommended</h4>
                                <p className="text-gray-500 text-sm">Formulated by leading nutritionists for sensitive skin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;