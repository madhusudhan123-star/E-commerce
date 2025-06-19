import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, } from 'swiper/modules';
import translations from '../utils/data';
import { motion } from "framer-motion";
import ProductCard from '../components/ProductCard';
import SecondComponent from '../components/Second';
import Horizontal from '../components/Horziental';
import Team from '../components/Team';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Hero.css'; // We'll create this file for custom styling
import mobilebanner from '../assets/main/mobilebanner.webp';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeIndex, setActiveIndex] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const filteredProducts =
        selectedCategory === 'All'
            ? translations.home.product
            : translations.home.product.filter((product) => product.category === selectedCategory);
            
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section - Responsive with mobile/desktop versions */}
            <section className="relative w-full overflow-hidden">
                {/* Mobile Banner - Only visible on small screens */}
                <div className="mobile-banner-container">
                    <a href='/shop'>
                    <img src={mobilebanner} alt="Mobile Banner" className="w-full" />
                    </a>
                </div>
                
                {/* Desktop Slider - Hidden on small screens */}
                <div className="desktop-banner-container">
                    <Slider {...settings}>
                        <div className="banner-slide">
                            <img src={translations.home.header.sider1img} alt="Banner 1" />
                        </div>
                        <div className="banner-slide">
                            <img src={translations.home.header.sider2img} alt="Banner 2" />
                        </div>
                        <div className="banner-slide">
                            <img src={translations.home.header.sider3img} alt="Banner 3" />
                        </div>
                    </Slider>
                </div>
            </section>

            <div>
                <section className="py-10 bg-gray-100">
                    <div className="text-center">
                        <h3 className='text-[#D88E7D] stylefont text-3xl'>{translations.home.fourth.short}</h3>
                        <h2 className="text-7xl  headerstyle">{translations.home.fourth.title}</h2>
                        <p className="text-gray-600 mt-2">{translations.home.fourth.sub}</p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-4">
                        {translations.products.product.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))}
                    </div>
                </section>
            </div>
            
            {/* Video Showcase Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        {/* <h3 className='text-[#D88E7D] stylefont text-3xl mb-2'>Our Videos</h3> */}
                        <h2 className="text-5xl headerstyle mb-4">Product Showcases</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Experience our products in action through these detailed video presentations</p>
                    </div>
                    
                    {/* Video Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Video 1 */}
                        <div className="video-card bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:shadow-2xl hover:-translate-y-1">
                            <div className="relative pb-[56.25%] h-0 overflow-hidden">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/IOxef5l-KFc"
                                    title="Product Showcase"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">Product Features</h3>
                                <p className="text-gray-600 mt-1">Discover the unique qualities of our handcrafted products</p>
                            </div>
                        </div>
                        
                        {/* Video 2 */}
                        <div className="video-card bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:shadow-2xl hover:-translate-y-1">
                            <div className="relative pb-[56.25%] h-0 overflow-hidden">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/pTRb3HcbXX8"
                                    title="Product Showcase"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">Crafting Process</h3>
                                <p className="text-gray-600 mt-1">See how our skilled artisans create each masterpiece</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className='relative'>
                <SecondComponent translations={translations} page="home" />
            </div>
            <div>
                <div className='flex flex-wrap justify-center p-10 flex-col w-full lg:flex-row md:flex-row sm:flex-row'>
                    {[1, 2, 3].map((num) => (
                        <div
                            key={num}
                            className='group relative flex text-center gap-12 lg:text-start md:text-start sm:text-center flex-col lg:flex-row md:flex-row sm:flex-col items-center w-full lg:w-1/3 md:w-1/3 sm:w-full mb-10 p-4 overflow-hidden hover:cursor-pointer'
                            style={{
                                position: 'relative',
                                zIndex: 1,
                            }}
                            data-aos={num === 1 ? 'fade-left' : num === 2 ? 'fade-bottom' : 'fade-right'}
                        >
                            {/* Sliding background element */}
                            <div
                                className="absolute top-0 left-0 w-full h-full bg-[#D88E7D] transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"
                                style={{
                                    zIndex: -1,
                                }}
                            />

                            <div className='relative'>
                                <img
                                    className='w-28 relative z-10'
                                    src={translations.home.third[`image${num}`]}
                                    alt="product"
                                />
                            </div>
                            <div className='group-hover:text-white transition-colors duration-300'>
                                <h1 className='text-2xl  headerstyle'>{translations.home.third[`title${num}`]}</h1>
                                <p>{translations.home.third[`subtitle${num}`]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
           
            <div>
                <div className='pb-10 h-[70vh] relative overflow-hidden'>
                    <div className='flex h-full backgroundimagechange flex-col w-full lg:flex-row md:flex-row sm:flex-row relative'>
                        {/* Gradient overlay for better text readability */}
                        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10'></div>
                        
                        <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full p-10 text-white relative z-20'>
                            {/* Main heading with enhanced spiritual theme */}
                            <h1 className='text-2xl mb-3 text-orange-300 stylefont tracking-wide'>
                                Divine Assurance From Ancient Epics
                            </h1>

                            <h1 className='text-4xl lg:text-5xl xl:text-6xl headerstyle mb-6 leading-tight'>
                                <span className='bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent'>
                                    Idols That Protect
                                </span>
                                <br />
                                <span className='text-orange-300'>
                                    and Bless Your Home
                                </span>
                            </h1>

                            {/* Description with Bhagavad Gita verse */}
                            <p className='mb-6 text-lg text-gray-200 leading-relaxed max-w-lg'>
                                “Abhayam sattva-samshuddhir” — Bhagavad Gita 16.1.  
                                Embrace fearlessness and purity as you invite <strong className='text-orange-300'>Sree Anjaneya</strong> for strength and 
                                <strong className='text-orange-300'>Sree Astha Laxmi</strong> for unending prosperity. 
                                Crafted with devotion, blessed through tradition.
                            </p>
                        </div>

                        <div className='w-1/2 p-8 relative z-20'>
                            {/* Left side can contain product showcase or remain empty for background focus */}
                        </div>
                        
                    </div>
                    
                    {/* Decorative elements */}
                    <div className='absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse'></div>
                    <div className='absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-lg animate-pulse delay-1000'></div>
                </div>
            </div>
            <div>
                <section className="bg-white py-16 px-4 relative">
                    {/* Title Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-serif italic text-red-500 stylefont">{translations.home.faqtitle}</h3>
                        <h2 className="text-6xl text-gray-900 headerstyle">{translations.home.faqsub}</h2>
                    </div>

                    {/* FAQ Section */}
                    <div className="flex flex-col md:flex-row gap-10 items-start justify-center items-center">
                        
                        {/* Image Section */}
                        <div className="hidden md:block relative w-full md:w-1/2">
                            <img
                                src={translations.home.images}
                                alt="Meditation"
                                className="w-full rounded-lg"
                            />
                        </div>
                        
                        {/* FAQ List */}
                        <div className="w-full md:w-1/2 p-10">
                            {translations.home.faqs.map((faq, index) => (
                                <div key={index} className="mb-4">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className={`w-full hover:bg-[#D88E7D] hover:text-white flex justify-between items-center p-4 border rounded-md text-left font-medium text-gray-800 ${activeIndex === index ? "bg-[#D88E7D] text-white" : "bg-gray-100"
                                            }`}
                                    >
                                        {faq.question}
                                        <span
                                            className={`transform transition-transform ${activeIndex === index ? "" : "rotate-180"
                                                }`}
                                        >
                                            ⬆️
                                        </span>
                                    </button>
                                    {activeIndex === index && (
                                        <div className="mt-2 p-4 bg-red-100 text-gray-700 rounded-md">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>


                    </div>
                </section>
            </div>
            <div>
                <Horizontal data={translations.home.horizontal} />
            </div>
            
            {/* last banner of home */}
            <div>
                <div className='pb-10 h-[70vh] relative overflow-hidden'>
                    <div className='flex h-full backgroundimagechange2 flex-col w-full lg:flex-row md:flex-row sm:flex-row relative'>
                        {/* Gradient overlay for better text readability */}
                        <div className='absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent z-10'></div>
                        
                        <div className='w-1/2 p-8 relative z-20 hidden sm:hidden md:block lg:block'>
                            {/* Left side showcases the spiritual products in background */}
                        </div>
                        
                        <div data-aos="zoom-in-up" className='w-full lg:w-1/2 md:w-1/2 sm:w-full p-0 md:p-10 text-white text-center flex justify-center flex-col items-center relative z-20'>    
                            {/* Main heading with enhanced styling */}
                            {/* <h1 className='text-3xl mb-5 text-amber-300 stylefont tracking-wide'>
                                {translations.home.nine.short}
                            </h1> */}
                            
                            <h1 className='text-4xl lg:text-5xl xl:text-6xl headerstyle mb-8 leading-tight'>
                                <span className='bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent'>
                                    Handcrafted Spiritual
                                </span>
                                <br />
                                <span className='text-amber-300'>
                                    Treasures for Your Home
                                </span>
                            </h1>
                            
                            {/* Enhanced description */}
                            <p className='mb-8 text-lg text-gray-200 leading-relaxed max-w-2xl'>
                                Inspired by the timeless devotion of the <strong>Ramayana</strong> and the wisdom of the <strong>Bhagavad Gita</strong>, 
                                each of our spiritual idols and decor pieces is lovingly handcrafted by skilled artisans. 
                                Bring home these symbols of protection, prosperity, and inner peace — perfect for daily puja, 
                                thoughtful gifting, or blessing your living space with divine grace and harmony.
                            </p>
                        </div>

                    </div>
                    
                    {/* Decorative spiritual elements */}
                    <div className='absolute top-16 right-16 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse'></div>
                    <div className='absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse delay-700'></div>
                    <div className='absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-br from-red-400/15 to-pink-400/15 rounded-full blur-lg animate-pulse delay-1500'></div>
                </div>
            </div>
            <div>
                <Team />
            </div>
        </div >
    )
};

export default Home;