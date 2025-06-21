import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye, faHeart, faStopwatch, faExclamationCircle, faGift } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './CartContext';
import { motion } from 'framer-motion';

// Custom CSS for animations
const customStyles = `
  @keyframes pulse-border {
    0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
    100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
  }
  
  .pulse-border {
    animation: pulse-border 2s infinite;
  }
  
  @keyframes flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.5; }
  }
  
  .flash-animation {
    animation: flash 2s infinite;
  }
`;

const ProductCard = ({ id, name, cost, photo, isNew, discount = 0, freeAccessories = [] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeImage, setActiveImage] = useState(photo.image1);
    const { addToCart } = useCart();
    const [timeRemaining, setTimeRemaining] = useState(null);
    
    const hasFreeAccessories = freeAccessories && freeAccessories.length > 0;
    
    // Get different countdown times based on product ID
    useEffect(() => {
        const getCountdownTimeForProduct = (productId) => {
            // Create different time patterns based on product ID
            const timePatterns = {
                1: { hours: 2, minutes: 37 },
                2: { hours: 6, minutes: 14 },
                3: { hours: 3, minutes: 58 },
                4: { hours: 1, minutes: 12 },
                5: { hours: 5, minutes: 42 },
                6: { hours: 7, minutes: 18 },
                7: { hours: 2, minutes: 23 },
                8: { hours: 4, minutes: 50 },
                9: { hours: 8, minutes: 5 },
                10: { hours: 1, minutes: 49 },
                // Default time for other products
                default: { hours: 4, minutes: 59 }
            };
            
            return timePatterns[productId] || timePatterns.default;
        };
        
        setTimeRemaining(getCountdownTimeForProduct(parseInt(id)));
    }, [id]);
    
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
    
    // Generate random stock number (only for display purposes)
    const randomStock = Math.floor(Math.random() * 10) + 1;
    const isLowStock = randomStock <= 5;
    
    return (
        <>
            <style>{customStyles}</style>
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
                            {/* {hasFreeAccessories && (
                                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                                    <FontAwesomeIcon icon={faGift} className="mr-1" /> FREE GIFT
                                </span>
                            )} */}
                        </div>
                        
                        {/* Urgency Timer - Always visible */}
                        {(discount > 0 || hasFreeAccessories) && timeRemaining && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center pulse-border">
                                <FontAwesomeIcon icon={faStopwatch} className="mr-1" />
                                <span>
                                    {timeRemaining.hours}h {timeRemaining.minutes}m
                                </span>
                            </div>
                        )}
                        
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
                        
                        {/* Low Stock Warning */}
                        {isLowStock && (
                            <div className="mt-1 text-xs text-red-600 flex items-center flash-animation">
                                <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                                <span>Only {randomStock} left in stock</span>
                            </div>
                        )}
                        
                        {/* Free Accessories Notice */}
                        {hasFreeAccessories && (
                            <div className="mt-1 text-xs text-orange-600 flex items-center">
                                <FontAwesomeIcon icon={faGift} className="mr-1" />
                                <span>Free accessories with online payment</span>
                            </div>
                        )}
                        
                        {/* Shop Now button */}
                        <div className="mt-3">
                            <button 
                                className={`w-full ${isLowStock || discount > 0 || hasFreeAccessories ? 
                                    'bg-red-600 text-white hover:bg-red-700' : 
                                    'bg-white border border-[#DA9687] text-[#DA9687] hover:bg-[#DA9687] hover:text-white'} 
                                    py-1.5 rounded-md transition-colors duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
                            >
                                {isLowStock ? 'Buy Now - Limited Stock!' : 'Shop Now'}
                            </button>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </>
    );
};

export default ProductCard;