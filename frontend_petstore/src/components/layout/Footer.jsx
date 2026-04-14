import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">The Digital Sanctuary</h3>
                        <p className="text-gray-600 text-sm">
                            Curating the finest essentials for your beloved companions. Quality, sustainability, and joy in every delivery.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-orange-600 mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/products" className="hover:text-orange-600 transition-colors">All Products</Link></li>
                            <li><Link to="/products?category=Dogs" className="hover:text-orange-600 transition-colors">Dogs</Link></li>
                            <li><Link to="/products?category=Cats" className="hover:text-orange-600 transition-colors">Cats</Link></li>
                            <li><Link to="/products?organic=true" className="hover:text-orange-600 transition-colors">Organic</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-orange-600 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
                            <li><Link to="/shipping" className="hover:text-orange-600 transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-orange-600 transition-colors">Returns</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-orange-600 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; 2024 The Digital Sanctuary. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;