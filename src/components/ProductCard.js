import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ id, name, cost, photo, isNew, discount = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeImage, setActiveImage] = useState(photo.image1);
    const { addToCart } = useCart();
    
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const cartItemId = `${id}-${Date.now()}`;
        const newCartItem = {
            id,
            name,
            cost,
            photo,
            cartItemId
        };
        
        addToCart(newCartItem);
        
        // Add animation or notification here if desired
    };
    
    // Calculate sale price if there's a discount
    const salePrice = discount ? (cost * (1 - discount / 100)).toFixed(2) : null;
    
    return (
        <motion.div 
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setActiveImage(photo.image1);
            }}
        >
            <Link to={`/product/${id}`} className="block h-full">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square">
                    <img
                        src={photo.image1}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Sale & New Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {isNew && (
                            <span className="bg-[#DA9687] text-white text-xs font-bold px-3 py-1 rounded-full">
                                NEW
                            </span>
                        )}
                        {discount > 0 && (
                            <span className="bg-[#514B60] text-white text-xs font-bold px-3 py-1 rounded-full">
                                {discount}% OFF
                            </span>
                        )}
                    </div>
                    
                    {/* Quick Action Buttons - Appear on Hover */}
                    <div className={`absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-3 px-4 flex justify-between items-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        <button 
                            onClick={handleAddToCart}
                            className="bg-white text-[#DA9687] hover:bg-[#DA9687] hover:text-white p-2 rounded-full transition-colors duration-300"
                            aria-label="Add to cart"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                        <Link 
                            to={`/product/${id}`}
                            className="bg-white text-[#514B60] hover:bg-[#514B60] hover:text-white p-2 rounded-full transition-colors duration-300"
                            aria-label="Quick view"
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
                    </div>
                </div>
                
                {/* Product Details */}
                <div className="p-4">
                    <div className="mb-1 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
                            {name}
                        </h3>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="text-[#DA9687] font-semibold text-lg">
                                ₹{salePrice}
                                </span>
                                <span className="text-gray-500 text-sm line-through ml-2">
                                ₹{cost.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-[#DA9687] font-semibold text-lg">
                                ₹{cost.toFixed(2)}
                            </span>
                        )}
                    </div>
                    
                    {/* Shop Now button */}
                    <div className="mt-3">
                        <button 
                            className={`w-full bg-white border border-[#DA9687] text-[#DA9687] hover:bg-[#DA9687] hover:text-white py-1.5 rounded-md transition-colors duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;