import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import translations from '../utils/data';
import PageHeader from '../components/Other';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import banner from '../assets/main/banner5.webp'

const Store = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const { products } = translations;
    
    // Filter products based on selected category and search
    const filteredProducts = selectedCategory === 'all'
        ? products.product.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : products.product.filter(product => 
            product.category === selectedCategory && 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const toggleWishlist = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlist(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId) 
                : [...prev, productId]
        );
    };

    return (
        <div className="bg-[#F8F5F1] min-h-screen">
            {/* Spiritual Hero Banner */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20" 
                     style={{backgroundImage: `url(${banner})`}}></div>
                <div className="relative py-20 px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif text-[#614E42] mb-4">Sacred Collection</h1>
                    <p className="text-xl md:text-2xl text-[#614E42] max-w-2xl mx-auto font-light">
                        Discover products that elevate your spiritual journey
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mt-8 relative">
                        <input
                            type="text"
                            placeholder="Search for spiritual items..."
                            className="w-full py-3 px-5 pr-12 rounded-full bg-white/80 backdrop-blur-sm border border-[#D8C3A5] text-[#614E42] focus:outline-none focus:ring-2 focus:ring-[#8E9775]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute right-4 top-4 text-[#8E9775]" />
                    </div>
                </div>
            </div>
            
            {/* Store Content */}
            <div className="container mx-auto px-4 py-12">

                {/* Products Grid - Styled for spiritual theme */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group">
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E0DBCF]">
                                <div className="relative overflow-hidden aspect-square">
                                    <img
                                        src={product.photo.image1}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    
                                    {/* Heart Icon for Wishlist */}
                                    {/* <button 
                                        onClick={(e) => toggleWishlist(e, product.id)}
                                        className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full transition-colors duration-300"
                                    >
                                        <FaHeart className={`text-lg ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-400'}`} />
                                    </button> */}
                                    
                                    {product.isNew && (
                                        <div className="absolute top-3 left-3 bg-[#8E9775]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                            New Arrival
                                        </div>
                                    )}
                                    
                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <button className="bg-white text-[#614E42] px-6 py-2 rounded-full font-medium hover:bg-[#8E9775] hover:text-white transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5">
                                    <h3 className="text-xl font-serif text-[#614E42] group-hover:text-[#8E9775] transition-colors mb-1">
                                        {product.name}
                                    </h3>
                                    
                                    <p className="text-[#8E9775] text-sm mb-3">{product.category}</p>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-medium text-[#614E42]">₹{product.cost}</span>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`text-lg ${index < product.rating ? 'text-amber-500' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    {/* <button  className="w-full mt-4 bg-[#E0DBCF] text-[#614E42] py-2 rounded-full flex items-center justify-center gap-2 hover:bg-[#8E9775] hover:text-white transition-colors duration-300" onClick={(e) => { e.preventDefault(); e.stopPropagation();}}>
                                        <FaShoppingCart /> Add to Cart
                                    </button> */}
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full text-center py-16">
                            <div className="text-7xl mb-4">🕊️</div>
                            <h3 className="text-2xl font-serif text-[#614E42] mb-2">Your spiritual items await discovery</h3>
                            <p className="text-[#8E9775]">Try another search or category</p>
                        </div>
                    )}
                </div>

                {/* Inspirational Quote */}
                <div className="text-center mb-12">
                    <p className="italic text-[#614E42] text-xl">"The spiritual journey is the unlearning of fear and the acceptance of love."</p>
                    <p className="text-[#8E9775] mt-2">— Marianne Williamson</p>
                </div>
                
                <div className="text-center mb-12">
                    <h1 className='text-3xl text-[#D88E7D] stylefont mb-2'>Sacred Collection</h1>
                    <h2 className="text-5xl mb-6 headerstyle text-[#614E42]">Divine Products</h2>
                    
                    {/* Category Selection - Styled for spiritual theme */}
                    {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <button
                            className={`px-6 py-2 rounded-full font-serif transition-all duration-300 ${
                                selectedCategory === 'all' 
                                    ? 'bg-[#8E9775] text-white shadow-md' 
                                    : 'bg-[#E0DBCF] text-[#614E42] hover:bg-[#D8C3A5]'
                            }`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All Items
                        </button>
                        {products.categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-6 py-2 rounded-full font-serif transition-all duration-300 ${
                                    selectedCategory === category 
                                        ? 'bg-[#8E9775] text-white shadow-md' 
                                        : 'bg-[#E0DBCF] text-[#614E42] hover:bg-[#D8C3A5]'
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div> */}
                </div>

                {/* Spiritual Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3 text-[#8E9775]">✨</div>
                        <h3 className="text-xl text-[#614E42] font-serif mb-2">Divine Quality</h3>
                        <p className="text-[#614E42]">Each item is ethically sourced and created with intentional purpose</p>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3 text-[#8E9775]">🕉️</div>
                        <h3 className="text-xl text-[#614E42] font-serif mb-2">Sacred Energy</h3>
                        <p className="text-[#614E42]">Products blessed with positive vibrations to elevate your spiritual practice</p>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg text-center">
                        <div className="text-4xl mb-3 text-[#8E9775]">🌿</div>
                        <h3 className="text-xl text-[#614E42] font-serif mb-2">Healing Intent</h3>
                        <p className="text-[#614E42]">Carefully crafted to support your healing journey and spiritual growth</p>
                    </div>
                </div>


                
                {/* Testimonials */}
                <div className="mt-20">
                    <h2 className="text-3xl font-serif text-[#614E42] text-center mb-10">Soul Testimonials</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg">
                            <div className="text-[#8E9775] text-5xl mb-4">"</div>
                            <p className="italic text-[#614E42] mb-4">The prayer beads I purchased have truly enhanced my meditation practice. I can feel the sacred energy within them.</p>
                            <p className="font-medium text-[#8E9775]">— Sarah J.</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg">
                            <div className="text-[#8E9775] text-5xl mb-4">"</div>
                            <p className="italic text-[#614E42] mb-4">Since using the cleansing kit, my home feels lighter and more peaceful. The quality of these spiritual items is exceptional.</p>
                            <p className="font-medium text-[#8E9775]">— Michael T.</p>
                        </div>
                        
                        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg">
                            <div className="text-[#8E9775] text-5xl mb-4">"</div>
                            <p className="italic text-[#614E42] mb-4">The incense from this store has a purity I haven't found elsewhere. It's become an essential part of my daily spiritual practice.</p>
                            <p className="font-medium text-[#8E9775]">— Priya M.</p>
                        </div>
                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-serif text-[#614E42] mb-4">Begin Your Spiritual Journey Today</h2>
                    <p className="text-[#8E9775] max-w-2xl mx-auto mb-8">
                        Each product is designed to enhance your connection to the divine and support your spiritual growth
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Store;