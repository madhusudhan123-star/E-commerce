// src/components/ProductPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import translations from '../utils/data';
import PageHeader from './Other';

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [showNotification, setShowNotification] = useState(false);
    const product = translations.products.product.find(p => p.id === parseInt(id));

    const handleAddToCart = () => {
        addToCart(product);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    if (!product) {
        return <div className="container mx-auto px-4 py-8">Product not found</div>;
    }

    return (
        <div>
            <PageHeader title={product.name} subtitle="Home > Store > Product" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={product.photo.image1}
                                    alt={product.name}
                                    className="w-full h-[500px] object-cover rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {Object.values(product.photo).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {product.isNew && (
                                <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                    {translations.home.fourth.card}
                                </span>
                            )}
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-2xl text-blue-600">${product.cost}</p>
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">{translations.home.fourth.title}</h2>
                                <p className="text-gray-600">{product.description || 'No description available'}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{translations.home.fourth.subtitle}</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li>{translations.products.cat}: {product.category}</li>
                                    {product.details && Object.entries(product.details).map(([key, value]) => (
                                        <li key={key}>{key}: {value}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-6 space-x-4 relative">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-[#DA9687] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition"
                                >
                                    {translations.home.fourth.card}
                                </button>
                                <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 transition">
                                    Add to Wishlist
                                </button>

                                {/* Success Notification */}
                                {showNotification && (
                                    <div className="absolute top-[-40px] left-0 right-0 text-center">
                                        <span className="bg-green-500 text-white px-4 py-2 rounded-lg">
                                            Added to cart successfully!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;