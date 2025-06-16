// src/components/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Helmet } from 'react-helmet'; // For SEO
import { FaStar, FaStarHalfAlt, FaRegStar, FaShippingFast, FaCheck, FaExchangeAlt, FaShare, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGift, FaHeart, FaClock, FaShieldAlt, FaTruck } from 'react-icons/fa';
import translations from '../utils/data';
import PageHeader from './Other';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();
    const [showNotification , setShowNotification] = useState(false);
    const product = translations.products.product.find(p => p.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('description');
    const [activeImage, setActiveImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [zoom, setZoom] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // SEO-friendly data
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product?.name || "",
        "image": product?.photo?.image1 || "",
        "description": product?.description || "",
        "sku": `SKU-${product?.id || "0000"}`,
        "brand": {
            "@type": "Brand",
            "name": "Your Brand Name"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "INR",
            "price": product?.cost || 0,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };


    // Check if the product has free accessories directly from the product data
    const hasFreeAccessories = product?.freeAccessories && product.freeAccessories.length > 0;
    // Use the accessories from product data if available
    const freeAccessories = product?.freeAccessories || [];

    useEffect(() => {
        // Set the first image as active when product loads
        if (product && product.photo && product.photo.image1) {
            setActiveImage(product.photo.image1);
        }
        
        // Scroll to top when product changes
        window.scrollTo(0, 0);
        
        // Handle recently viewed products storage
        if (product) {
            // Get existing recently viewed products from localStorage
            const storedRecent = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            
            // Filter out current product if it already exists
            const filteredRecent = storedRecent.filter(item => item.id !== product.id);
            
            // Add current product to the beginning
            const updatedRecent = [product, ...filteredRecent].slice(0, 4);
            
            // Save back to localStorage
            localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
            
            // Set state for recently viewed (excluding current product for display)
            setRecentlyViewed(filteredRecent.slice(0, 4));
        }
    }, [product]);

    const handleAddToCart = () => {
        // Add cartItemId when adding to cart
        const cartItem = {
            ...product,
            quantity: quantity,
            cartItemId: Date.now() + Math.random(),
            addedAt: new Date().toISOString()
        };
        addToCart(cartItem);
        setShowNotification(true);

        // Update localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    const handleBuyNow = () => {
        // Get existing cart items
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Create new product item
        const newProduct = {
            name: product.name,
            quantity: quantity,
            price: Number(product.cost),
            cost: Number(product.cost) // Add cost property for consistency
        };

        // Process cart items to ensure they have proper price format
        const processedCartItems = cartItems.map(item => ({
            name: item.name,
            quantity: 1,
            price: Number(item.cost), // Use cost property from cart items
            cost: Number(item.cost)
        }));

        // Combine cart items with new product
        const allItems = [...processedCartItems, newProduct];

        // Calculate total amount
        const totalAmount = allItems.reduce((total, item) => {
            return total + (Number(item.price) || Number(item.cost) || 0) * (item.quantity || 1);
        }, 0);

        // Navigate to billing with combined items
        navigate('/billing', {
            state: {
                items: allItems,
                totalAmount: totalAmount,
                quantity: allItems.length,
                paymentMode: 'online',
            },
        });
    };

    // Dummy data for reviews
    const reviews = [
        { id: 1, user: 'Sarah Johnson', rating: 5, comment: 'Excellent product! Exactly as described.', date: '2023-10-15' },
        { id: 2, user: 'Michael Brown', rating: 4, comment: 'Great quality for the price. Fast delivery.', date: '2023-10-08' },
        { id: 3, user: 'Emma Davis', rating: 4.5, comment: 'Very happy with my purchase. Would buy again.', date: '2023-09-30' },
    ];

    // Dummy related products
    const relatedProducts = translations.products.product
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);
    
        if (!product) {
        return <div className="container mx-auto px-4 py-8">Product not found</div>;
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        
        return <div className="flex">{stars}</div>;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Use product-specific reviews from data
    const productReviews = product?.reviews || [];
    
    // Calculate average rating from product reviews
    const calculateAverageRating = () => {
        if (!productReviews.length) return 4.5; // Default if no reviews
        
        const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return (total / productReviews.length).toFixed(1);
    };
    
    const averageRating = calculateAverageRating();
    
    // Calculate rating distribution percentages
    const calculateRatingDistribution = () => {
        if (!productReviews.length) {
            // Default distribution if no reviews
            return {
                5: 70,
                4: 20,
                3: 5,
                2: 3,
                1: 2
            };
        }
        
        const distribution = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
        
        productReviews.forEach(review => {
            const rating = Math.floor(review.rating);
            distribution[rating] = (distribution[rating] || 0) + 1;
        });
        
        // Convert to percentages
        const total = productReviews.length;
        Object.keys(distribution).forEach(rating => {
            distribution[rating] = Math.round((distribution[rating] / total) * 100);
        });
        
        return distribution;
    };
    
    const ratingDistribution = calculateRatingDistribution();

    return (
        <>
            {/* SEO Optimization */}
            <Helmet>
                <title>{product.name} | Your Store Name</title>
                <meta name="description" content={`Buy ${product.name} - ${product.description?.substring(0, 150) || 'High quality product at the best price'}`} />
                <meta name="keywords" content={`${product.name}, ${product.category}, buy online, shop, quality products`} />
                <link rel="canonical" href={window.location.href} />
                <meta property="og:title" content={`${product.name} | Your Store Name`} />
                <meta property="og:description" content={product.description?.substring(0, 150) || 'High quality product at the best price'} />
                <meta property="og:image" content={product.photo.image1} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="product" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            </Helmet>

            <div>
                <PageHeader title={product.name} subtitle="Home > Store > Product" />
                
                {/* Notification - optimized for all screen sizes */}
                {showNotification && (
                    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
                        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center">
                            <FaCheck className="mr-2" />
                            <span>Added to cart successfully!</span>
                        </div>
                    </div>
                )}

                <div className="container mx-auto px-4 py-4 sm:py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Product Top Section */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                {/* Product Images - Left Side - optimized for mobile */}
                                <div className="p-4 sm:p-6 bg-gray-50 border-b md:border-r md:border-b-0 border-gray-100 relative">
                                    {/* Product Labels */}
                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                        {product.isNew && (
                                            <span className="inline-block bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                                                NEW ARRIVAL
                                            </span>
                                        )}
                                        
                                        {hasFreeAccessories && (
                                            <span className="inline-flex items-center bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                                                <FaGift className="mr-1 sm:mr-2" /> FREE EXTRAS
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Main Image - height adjusted for mobile */}
                                    <div 
                                        className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                                        onClick={() => setZoom(!zoom)}
                                    >
                                        <img
                                            src={activeImage}
                                            alt={product.name}
                                            className={`w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain transition-all duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
                                            loading="eager"
                                            title={product.name}
                                        />
                                    </div>
                                    
                                    {/* Thumbnail Gallery - mobile optimized */}
                                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 mt-4 sm:mt-6">
                                        {Object.values(product.photo).map((image, index) => (
                                            <div
                                                key={index}
                                                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${activeImage === image ? 'border-blue-500 shadow-sm' : 'border-transparent'}`}
                                                onClick={() => setActiveImage(image)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.name} view ${index + 1}`}
                                                    className="w-full h-14 sm:h-20 object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Info - Right Side - with mobile optimizations */}
                                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                                    {/* Product Title & Rating */}
                                    <div className="space-y-2">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name}</h1>
                                        
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                            <div className="flex items-center gap-2">
                                                {renderStars(4.5)}
                                                <span className="text-gray-600">(32)</span>
                                            </div>
                                            <span className="hidden sm:inline text-gray-500">|</span>
                                            <span className="text-green-600 flex items-center gap-1">
                                                <FaCheck size={14} />
                                                In Stock
                                            </span>
                                            <span className="hidden sm:inline text-gray-500">|</span>
                                            <span className="text-blue-600 flex items-center gap-1">
                                                <FaTruck size={14} />
                                                Fast Shipping
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price Section */}
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 sm:space-x-4">
                                            <p className="text-2xl sm:text-3xl font-bold text-blue-600">₹{product.cost.toLocaleString()}</p>
                                            <p className="text-sm sm:text-lg text-gray-500 line-through">₹{Math.floor(product.cost * 1.2).toLocaleString()}</p>
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs sm:text-sm font-medium">20% OFF</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">* Inclusive of all taxes</p>
                                    </div>

                                    {/* Short description */}
                                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                        {product.description || 'A premium quality product crafted with attention to detail and designed for everyday use.'}
                                    </p>

                                    {/* Free Accessories - Only show if product has free accessories */}
                                    {hasFreeAccessories && (
                                        <div className="bg-green-50 border border-green-100 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                                            <h3 className="flex items-center text-green-700 font-medium text-sm sm:text-base">
                                                <FaGift className="mr-2" /> 
                                                Free Accessories Included with this Product
                                            </h3>
                                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                                                {freeAccessories.map((item, idx) => (
                                                    <div key={idx} className="flex items-center bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-green-100">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name} 
                                                            className="w-10 h-10 sm:w-14 sm:h-14 object-cover rounded"
                                                            loading="lazy"
                                                        />
                                                        <div className="ml-2 sm:ml-3">
                                                            <h4 className="text-xs sm:text-sm font-medium text-gray-800">{item.name}</h4>
                                                            <p className="text-xs text-gray-600 hidden sm:block">{item.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Quantity Selector - mobile optimized touch targets */}
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-700 text-sm sm:text-base">Quantity:</span>
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button 
                                                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                                className="px-3 py-2 text-lg border-r hover:bg-gray-100 transition"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
                                            <button 
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="px-3 py-2 text-lg border-l hover:bg-gray-100 transition"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons - larger touch targets for mobile */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                                        <button
                                            onClick={handleAddToCart}
                                            className="bg-[#DA9687] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition flex-1 flex justify-center items-center"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={handleBuyNow}
                                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex-1 flex justify-center items-center"
                                        >
                                            Buy Now
                                        </button>
                                    </div>

                                    {/* Delivery & Service Features - mobile grid adjustment */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-b border-gray-200 py-4 my-4">
                                        <div className="flex items-center space-x-2">
                                            <FaShippingFast className="text-blue-500 text-lg sm:text-xl" />
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">Free Shipping</p>
                                                <p className="text-xs text-gray-500">For orders over ₹500</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaExchangeAlt className="text-blue-500 text-lg sm:text-xl" />
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">Easy Returns</p>
                                                <p className="text-xs text-gray-500">30 day return policy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaShieldAlt className="text-blue-500 text-lg sm:text-xl" />
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">Secure Payment</p>
                                                <p className="text-xs text-gray-500">100% secure checkout</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaClock className="text-blue-500 text-lg sm:text-xl" />
                                            <div>
                                                <p className="font-medium text-sm sm:text-base">24/7 Support</p>
                                                <p className="text-xs text-gray-500">Dedicated customer service</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Share */}
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Share this product:</p>
                                        <div className="flex space-x-3">
                                            {/* <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                                                <FaFacebook size={14} className="sm:text-base" />
                                            </a> */}
                                            {/* <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition">
                                                <FaTwitter size={14} className="sm:text-base" />
                                            </a> */}
                                            <a href="https://www.instagram.com/sacredrelm/" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition">
                                                <FaInstagram size={14} className="sm:text-base" />
                                            </a>
                                            <a href="http://www.youtube.com/@sacredrelm" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
                                                <FaYoutube size={14} className="sm:text-base" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Highlights - Quick Feature Banner - mobile optimized grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6 sm:my-8">
                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3">
                                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                                    <FaShippingFast className="text-blue-600 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm sm:text-base">Fast Delivery</h3>
                                    <p className="text-xs text-gray-500">Within 3-5 business days</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3">
                                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                                    <FaCheck className="text-green-600 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm sm:text-base">Quality Assurance</h3>
                                    <p className="text-xs text-gray-500">100% genuine products</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3">
                                <div className="bg-red-100 p-2 sm:p-3 rounded-full">
                                    <FaHeart className="text-red-600 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm sm:text-base">Customer Satisfaction</h3>
                                    <p className="text-xs text-gray-500">4.8/5 star rating</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3">
                                <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                                    <FaShieldAlt className="text-yellow-600 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm sm:text-base">Secure Shopping</h3>
                                    <p className="text-xs text-gray-500">Protected payment process</p>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Section - mobile responsive */}
                        <div className="mb-10 sm:mb-16 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            {/* Tab Headers - scrollable on mobile */}
                            <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
                                <button 
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium transition whitespace-nowrap flex-shrink-0 ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
                                    onClick={() => setActiveTab('description')}
                                >
                                    Description
                                </button>
                                {/* <button 
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium transition whitespace-nowrap flex-shrink-0 ${activeTab === 'specifications' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
                                    onClick={() => setActiveTab('specifications')}
                                >
                                    Specifications
                                </button> */}
                                <button 
                                    className={`px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium transition whitespace-nowrap flex-shrink-0 ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    Reviews ({productReviews.length})
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="p-4 sm:p-8">
                                {activeTab === 'description' && (
                                    <div className="prose max-w-none prose-sm sm:prose">
                                        <article>
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Product Description</h2>
                                            
                                            {/* Main description */}
                                            <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                                                {product.tabContent?.description?.main || product.description || 'No detailed description available for this product yet.'}
                                            </p>
                                            
                                            {/* Additional description text */}
                                            {product.tabContent?.description?.additionalText && (
                                                <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                                                    {product.tabContent.description.additionalText}
                                                </p>
                                            )}
                                            
                                            {/* Key Features */}
                                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Key Features</h3>
                                            <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                                {product.tabContent?.description?.features?.map((feature, idx) => (
                                                    <li key={idx}>{feature}</li>
                                                )) || (
                                                    <>
                                                        <li>Premium quality materials for durability</li>
                                                        <li>Ergonomic design for comfort and ease of use</li>
                                                        <li>Vibrant colors that won't fade with time</li>
                                                        <li>Designed and crafted with precision</li>
                                                        <li>Eco-friendly and sustainable production</li>
                                                    </>
                                                )}
                                            </ul>
                                            
                                            {/* Free Accessories - Only show if product has free accessories */}
                                            {hasFreeAccessories && (
                                                <>
                                                    <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Free Accessories Included</h3>
                                                    <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                                        {freeAccessories.map((item, idx) => (
                                                            <li key={idx}>
                                                                <span className="font-medium">{item.name}</span>: {item.description}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                            
                                            {/* How to Use */}
                                            <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">How to Use</h3>
                                            <ol className="list-decimal pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                                {product.tabContent?.description?.usage?.map((step, idx) => (
                                                    <li key={idx}>{step}</li>
                                                )) || (
                                                    <>
                                                        <li>Unpack your product carefully</li>
                                                        <li>Read the included instruction manual</li>
                                                        <li>Follow the setup steps as recommended</li>
                                                        <li>Enjoy your new purchase!</li>
                                                    </>
                                                )}
                                            </ol>
                                        </article>
                                    </div>
                                )}

                                {/* {activeTab === 'specifications' && (
                                    <div className="prose max-w-none prose-sm sm:prose">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Technical Specifications</h2>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border-collapse border border-gray-200 text-sm sm:text-base">
                                                <tbody>
                                                    {product.tabContent?.specifications ? (
                                                        product.tabContent.specifications.map((spec, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">{spec.name}</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">{spec.value}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <tr className="bg-gray-50">
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">Category</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">{product.category}</td>
                                                            </tr>
                                                            {product.details && Object.entries(product.details).map(([key, value]) => (
                                                                <tr key={key} className="even:bg-gray-50">
                                                                    <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">{key}</td>
                                                                    <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">{value}</td>
                                                                </tr>
                                                            ))}
                                                            <tr className="bg-gray-50">
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">Material</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">Premium Quality</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">Dimensions</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">10 x 15 x 5 cm</td>
                                                            </tr>
                                                            <tr className="bg-gray-50">
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">Weight</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">250g</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">Warranty</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">1 Year</td>
                                                            </tr>
                                                            <tr className="bg-gray-50">
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">SKU</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">SKU-{product.id.toString().padStart(4, '0')}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200 font-medium">Origin</td>
                                                                <td className="px-3 py-3 sm:px-6 sm:py-4 border border-gray-200">Made in India</td>
                                                            </tr>
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )} */}

                                {activeTab === 'reviews' && (
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Customer Reviews</h2>
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                                            <div className="text-center md:border-r md:border-gray-200 md:pr-8">
                                                <div className="text-4xl sm:text-5xl font-bold text-gray-900">{averageRating}</div>
                                                <div className="flex justify-center mt-2">
                                                    {renderStars(parseFloat(averageRating))}
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-500 mt-1">Based on {productReviews.length} reviews</div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-center mb-1">
                                                    <span className="w-9 sm:w-12 text-xs sm:text-sm">5 star</span>
                                                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-yellow-400 rounded-full" style={{width: `${ratingDistribution[5]}%`}}></div>
                                                    </div>
                                                    <span className="w-9 sm:w-12 text-right text-xs sm:text-sm">{ratingDistribution[5]}%</span>
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <span className="w-9 sm:w-12 text-xs sm:text-sm">4 star</span>
                                                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-yellow-400 rounded-full" style={{width: `${ratingDistribution[4]}%`}}></div>
                                                    </div>
                                                    <span className="w-9 sm:w-12 text-right text-xs sm:text-sm">{ratingDistribution[4]}%</span>
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <span className="w-9 sm:w-12 text-xs sm:text-sm">3 star</span>
                                                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-yellow-400 rounded-full" style={{width: `${ratingDistribution[3]}%`}}></div>
                                                    </div>
                                                    <span className="w-9 sm:w-12 text-right text-xs sm:text-sm">{ratingDistribution[3]}%</span>
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <span className="w-9 sm:w-12 text-xs sm:text-sm">2 star</span>
                                                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-yellow-400 rounded-full" style={{width: `${ratingDistribution[2]}%`}}></div>
                                                    </div>
                                                    <span className="w-9 sm:w-12 text-right text-xs sm:text-sm">{ratingDistribution[2]}%</span>
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <span className="w-9 sm:w-12 text-xs sm:text-sm">1 star</span>
                                                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                                                        <div className="h-2 bg-yellow-400 rounded-full" style={{width: `${ratingDistribution[1]}%`}}></div>
                                                    </div>
                                                    <span className="w-9 sm:w-12 text-right text-xs sm:text-sm">{ratingDistribution[1]}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Reviews List */}
                                        <div className="space-y-6 sm:space-y-8">
                                            {productReviews.length > 0 ? (
                                                productReviews.map(review => (
                                                    <article key={review.id} className="border-b border-gray-200 pb-4 sm:pb-6">
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium text-base sm:text-lg">
                                                                    {review.user.charAt(0)}
                                                                </div>
                                                                <div className="ml-3 sm:ml-4">
                                                                    <h4 className="font-medium text-base sm:text-lg">{review.user}</h4>
                                                                    <div className="flex items-center flex-wrap">
                                                                        {renderStars(review.rating)}
                                                                        <span className="ml-2 text-gray-500 text-xs sm:text-sm">
                                                                            {formatDate(review.date)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className="flex items-center gap-2 text-gray-500 mt-2 sm:mt-0">
                                                                <span className="text-xs sm:text-sm">Was this helpful?</span>
                                                                <button className="text-xs sm:text-sm hover:text-blue-600 transition">Yes</button>
                                                                <span>•</span>
                                                                <button className="text-xs sm:text-sm hover:text-blue-600 transition">No</button>
                                                            </div> */}
                                                        </div>
                                                        <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base">{review.comment}</p>
                                                    </article>
                                                ))
                                            ) : (
                                                <div className="text-center py-6 sm:py-8">
                                                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                                                </div>
                                            )}
                                        {/*                                         
                                            <div className="text-center pt-2 sm:pt-4">
                                                <button className="border border-gray-300 text-gray-700 rounded-lg px-4 sm:px-6 py-2 hover:bg-gray-50 transition text-sm sm:text-base">
                                                    Load more reviews
                                                </button>
                                            </div> 
                                        */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Recently Viewed Products - mobile-optimized grid */}
                        {recentlyViewed.length > 0 && (
                            <div className="mb-8 sm:mb-12">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recently Viewed</h2>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                    {recentlyViewed.map((recentProduct) => (
                                        <div key={recentProduct.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                                            <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative overflow-hidden">
                                                <img 
                                                    src={recentProduct.photo.image1} 
                                                    alt={recentProduct.name} 
                                                    className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button 
                                                        onClick={() => navigate(`/product/${recentProduct.id}`)}
                                                        className="bg-white text-gray-900 px-3 py-1 sm:px-4 sm:py-2 rounded-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform font-medium text-xs sm:text-sm"
                                                    >
                                                        Quick View
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-3 sm:p-4">
                                                <h3 className="font-medium truncate group-hover:text-blue-600 transition text-sm sm:text-base">{recentProduct.name}</h3>
                                                <div className="flex items-center mt-1">
                                                    {renderStars(4)}
                                                </div>
                                                <div className="mt-1 sm:mt-2 font-bold text-sm sm:text-base">₹{recentProduct.cost.toLocaleString()}</div>
                                                <button 
                                                    onClick={() => navigate(`/product/${recentProduct.id}`)} 
                                                    className="mt-2 sm:mt-3 w-full bg-[#DA9687] text-white py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-opacity-90 transition"
                                                >
                                                    View Product
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Related Products Section - mobile-optimized grid */}
                        {/* {relatedProducts.length > 0 && (
                            <div className="mt-8 sm:mt-16">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">You May Also Like</h2>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                    {relatedProducts.map(product => (
                                        <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group">
                                            <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative overflow-hidden">
                                                <img 
                                                    src={product.photo.image1} 
                                                    alt={product.name} 
                                                    className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                                                    loading="lazy"
                                                />
                                                {product.isNew && (
                                                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                                                )}
                                            </div>
                                            <div className="p-3 sm:p-4">
                                                <h3 className="font-medium truncate group-hover:text-blue-600 transition text-sm sm:text-base">{product.name}</h3>
                                                <div className="flex items-center mt-1">
                                                    {renderStars(4)}
                                                </div>
                                                <div className="mt-1 sm:mt-2 font-bold text-sm sm:text-base">₹{product.cost.toLocaleString()}</div>
                                                <button 
                                                    onClick={() => navigate(`/product/${product.id}`)} 
                                                    className="mt-2 sm:mt-3 w-full bg-[#DA9687] text-white py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-opacity-90 transition"
                                                >
                                                    View Product
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;