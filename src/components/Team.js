import React, { useState, useEffect } from 'react';
import translations from '../utils/data';
import { motion } from 'framer-motion';
import bg from '../assets/home/bg-test.png';

const Team = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);
    
    // Handle autoplay
    useEffect(() => {
        if (!autoplay) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % translations.home.reviews.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [autoplay]);
    
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute left-0 top-1/4 w-64 h-64 bg-[#D88E7D]/10 rounded-full blur-3xl"></div>
            <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-[#D88E7D]/5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 relative">
                    
                    <motion.h2 
                        className="text-4xl md:text-5xl lg:text-6xl headerstyle mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Happy Clients
                    </motion.h2>
                    
                    <motion.p 
                        className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        See how our products have transformed the lives of our customers.
                    </motion.p>
                    
                    <motion.div 
                        className="h-1 w-24 bg-gradient-to-r from-[#D88E7D] to-[#FF7E5F] mx-auto rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    ></motion.div>
                </div>
                
                {/* Featured Testimonial (Spotlight) */}
                <div className="mb-20">
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                        <motion.div 
                            className="flex flex-col md:flex-row"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 lg:w-5/12 relative">
                                <div className="relative h-56 md:h-full">
                                    <img 
                                        src={translations.home.reviews[activeIndex].image} 
                                        alt={translations.home.reviews[activeIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                        <div className="p-6 text-white">
                                            <div className="flex mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg 
                                                        key={i} 
                                                        className={`w-5 h-5 ${i < translations.home.reviews[activeIndex].rating ? "text-yellow-400" : "text-gray-400"}`}
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <h3 className="font-bold text-xl">{translations.home.reviews[activeIndex].name}</h3>
                                            <p className="text-white/70 text-sm">{translations.home.reviews[activeIndex].date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className="w-full md:w-1/2 lg:w-7/12 p-8 md:p-12">
                                <div className="h-full flex flex-col justify-center">
                                    <svg className="text-[#D88E7D]/20 w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M10 8c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h10c2.209 0 4-1.791 4-4v-10c0-2.209-1.791-4-4-4h-10zM8 14c0-1.103 0.897-2 2-2v0c1.103 0 2 0.897 2 2v6c0 1.103-0.897 2-2 2v0c-1.103 0-2-0.897-2-2v-6zM20 14c0-1.103 0.897-2 2-2v0c1.103 0 2 0.897 2 2v6c0 1.103-0.897 2-2 2v0c-1.103 0-2-0.897-2-2v-6z"></path>
                                    </svg>
                                    
                                    <p className="text-xl md:text-2xl italic leading-relaxed text-gray-700 mb-8">
                                        "{translations.home.reviews[activeIndex].review}"
                                    </p>
                                    
                                    {/* Testimonial Navigation */}
                                    <div className="flex justify-between items-center mt-auto">
                                        <div className="flex space-x-2">
                                            {translations.home.reviews.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setActiveIndex(index);
                                                        setAutoplay(false);
                                                    }}
                                                    className={`w-2 h-2 rounded-full transition-all ${
                                                        activeIndex === index 
                                                        ? "bg-[#D88E7D] w-6" 
                                                        : "bg-gray-300"
                                                    }`}
                                                    aria-label={`View testimonial ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                        
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => {
                                                    setActiveIndex((prev) => 
                                                        prev === 0 ? translations.home.reviews.length - 1 : prev - 1
                                                    );
                                                    setAutoplay(false);
                                                }}
                                                className="p-2 rounded-full border border-gray-200 hover:bg-[#D88E7D] hover:border-[#D88E7D] hover:text-white transition-colors"
                                                aria-label="Previous testimonial"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setActiveIndex((prev) => 
                                                        (prev + 1) % translations.home.reviews.length
                                                    );
                                                    setAutoplay(false);
                                                }}
                                                className="p-2 rounded-full border border-gray-200 hover:bg-[#D88E7D] hover:border-[#D88E7D] hover:text-white transition-colors"
                                                aria-label="Next testimonial"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                {/* Testimonial Grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {translations.home.reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredId(index)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className={`w-full h-full transition-transform duration-300 ${
                                        hoveredId === index ? 'scale-105' : 'scale-100'
                                    }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 z-20">
                                    <div className="flex mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`${i < review.rating ? "text-yellow-400" : "text-gray-400"}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <p className="text-gray-700 mb-4 line-clamp-3">"{review.review}"</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                    <motion.div 
                                        className="w-8 h-8 bg-[#D88E7D]/10 rounded-full flex items-center justify-center text-[#D88E7D]"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div> */}
            
                {/* CTA Section */}
                {/* <motion.div 
                    className="mt-20 bg-gradient-to-r from-[#D88E7D] to-[#FF7E5F] rounded-2xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Experience the Difference Today</h3>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">Join thousands of satisfied customers and discover why our products are rated 4.9/5 stars.</p>
                    <a href='/shop'>
                        <button className="bg-white text-[#D88E7D] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
                            Shop Now
                        </button>
                    </a>
                </motion.div> */}
            </div>
        </section>
    );
};

export default Team;