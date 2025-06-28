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
import CookieConsent from '../components/CookieConsent';
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
            
            {/*<div className='relative'>
                <SecondComponent translations={translations} page="home" />
            </div> */}

            <div>
                <section className="py-10 bg-gray-100">
                    <div className="text-center">
                        <h3 className='text-[#D88E7D] stylefont text-3xl'>{translations.home.fourth.short}</h3>
                        <h2 className="text-7xl  headerstyle">{translations.home.fourth.title}</h2>
                        <p className="text-gray-600 mt-2">{translations.home.fourth.sub}</p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 container mx-auto px-4">
                        {translations.products.product.map((product, index) => (
                            <ProductCard key={index} {...product} />
                        ))}
                    </div>
                </section>
            </div>

            {/* Bhagavad Gita Shloka Slider */}
            <section className="py-16  relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-10 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-300/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">

                    {/* Shloka Slider */}
                    <div className="max-w-4xl mx-auto">
                        <Slider 
                            {...{
                                dots: true,
                                infinite: true,
                                speed: 800,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 5000,
                                arrows: false,
                                pauseOnHover: true,
                                fade: true,
                            }}
                            className="shloka-slider"
                        >                            {/* Shloka 1 */}
                            <div className="px-4">
                                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-200/50 hover:border-orange-300 cursor-pointer relative overflow-hidden">
                                    <div className="text-center relative">
                                        {/* English Translation with word-by-word animation */}
                                        <div className="group-hover:opacity-0 transition-opacity duration-700">
                                            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '0ms'}}>You</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '50ms'}}>have</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '100ms'}}>the</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '150ms'}}>right</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '200ms'}}>to</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '250ms'}}>perform</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '300ms'}}>your</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '350ms'}}>prescribed</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '400ms'}}>duty,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '450ms'}}>but</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '500ms'}}>never</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '550ms'}}>to</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '600ms'}}>the</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '650ms'}}>fruits</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '700ms'}}>of</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '750ms'}}>action.</span>
                                            </blockquote>
                                            <cite className="text-orange-600 font-semibold">— Bhagavad Gita 2.47</cite>
                                        </div>
                                        
                                        {/* Sanskrit with staggered entrance animation */}
                                        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="text-center">
                                                <div className="text-2xl lg:text-3xl text-orange-700 font-bold mb-4 leading-relaxed">
                                                    <div className="mb-2">
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>कर्मण्येवाधिकारस्ते</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>मा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>फलेषु</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '800ms'}}>कदाचन।</span>
                                                    </div>
                                                    <div>
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1000ms'}}>मा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1200ms'}}>कर्मफलहेतुर्भूर्मा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1400ms'}}>ते</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1600ms'}}>सङ्गोऽस्त्वकर्मणि॥</span>
                                                    </div>
                                                </div>
                                                <cite className="text-orange-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 inline-block" style={{transitionDelay: '1800ms'}}>— भगवद्गीता २.४७</cite>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shloka 2 */}
                            <div className="px-4">
                                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-200/50 hover:border-orange-300 cursor-pointer relative overflow-hidden">
                                    <div className="text-center relative">
                                        {/* English Translation with word-by-word animation */}
                                        <div className="group-hover:opacity-0 transition-opacity duration-700">
                                            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '0ms'}}>When</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '50ms'}}>meditation</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '100ms'}}>is</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '150ms'}}>mastered,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '200ms'}}>the</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '250ms'}}>mind</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '300ms'}}>is</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '350ms'}}>unwavering</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '400ms'}}>like</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '450ms'}}>the</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '500ms'}}>flame</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '550ms'}}>of</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '600ms'}}>a</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '650ms'}}>lamp</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '700ms'}}>in</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '750ms'}}>a</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '800ms'}}>windless</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '850ms'}}>place.</span>
                                            </blockquote>
                                            <cite className="text-orange-600 font-semibold">— Bhagavad Gita 6.19</cite>
                                        </div>
                                        
                                        {/* Sanskrit with staggered entrance animation */}
                                        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="text-center">
                                                <div className="text-2xl lg:text-3xl text-orange-700 font-bold mb-4 leading-relaxed">
                                                    <div className="mb-2">
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>यथा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>दीपो</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>निवातस्थो</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '800ms'}}>नेङ्गते</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1000ms'}}>सोपमा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1200ms'}}>स्मृता।</span>
                                                    </div>
                                                    <div>
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1400ms'}}>योगिनो</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1600ms'}}>यतचित्तस्य</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1800ms'}}>युञ्जतो</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '2000ms'}}>योगमात्मनः॥</span>
                                                    </div>
                                                </div>
                                                <cite className="text-orange-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 inline-block" style={{transitionDelay: '2200ms'}}>— भगवद्गीता ६.१९</cite>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            {/* Shloka 3 */}
                            <div className="px-4">
                                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-200/50 hover:border-orange-300 cursor-pointer relative overflow-hidden">
                                    <div className="text-center relative">
                                        {/* English Translation with word-by-word animation */}
                                        <div className="group-hover:opacity-0 transition-opacity duration-700">
                                            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '0ms'}}>Those</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '50ms'}}>who</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '100ms'}}>are</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '150ms'}}>free</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '200ms'}}>from</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '250ms'}}>anger,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '300ms'}}>fear,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '350ms'}}>and</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '400ms'}}>attachment,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '450ms'}}>are</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '500ms'}}>purified</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '550ms'}}>by</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '600ms'}}>knowledge.</span>
                                            </blockquote>
                                            <cite className="text-orange-600 font-semibold">— Bhagavad Gita 4.10</cite>
                                        </div>
                                        
                                        {/* Sanskrit with staggered entrance animation */}
                                        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="text-center">
                                                <div className="text-2xl lg:text-3xl text-orange-700 font-bold mb-4 leading-relaxed">
                                                    <div className="mb-2">
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>वीतरागभयक्रोधा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>मन्मया</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>मामुपाश्रिताः।</span>
                                                    </div>
                                                    <div>
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '800ms'}}>बहवो</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1000ms'}}>ज्ञानतपसा</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1200ms'}}>पूता</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1400ms'}}>मद्भावमागताः॥</span>
                                                    </div>
                                                </div>
                                                <cite className="text-orange-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 inline-block" style={{transitionDelay: '1600ms'}}>— भगवद्गीता ४.१०</cite>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shloka 4 */}
                            <div className="px-4">
                                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-200/50 hover:border-orange-300 cursor-pointer relative overflow-hidden">
                                    <div className="text-center relative">
                                        {/* English Translation with word-by-word animation */}
                                        <div className="group-hover:opacity-0 transition-opacity duration-700">
                                            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '0ms'}}>Fearlessness,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '50ms'}}>purity</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '100ms'}}>of</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '150ms'}}>mind,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '200ms'}}>charity,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '250ms'}}>self-control,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '300ms'}}>sacrifice,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '350ms'}}>and</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '400ms'}}>honesty</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '450ms'}}>are</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '500ms'}}>divine</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '550ms'}}>qualities.</span>
                                            </blockquote>
                                            <cite className="text-orange-600 font-semibold">— Bhagavad Gita 16.1</cite>
                                        </div>
                                        
                                        {/* Sanskrit with staggered entrance animation */}
                                        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="text-center">
                                                <div className="text-2xl lg:text-3xl text-orange-700 font-bold mb-4 leading-relaxed">
                                                    <div className="mb-2">
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>अभयं</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।</span>
                                                    </div>
                                                    <div>
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>दानं</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '800ms'}}>दमश्च</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1000ms'}}>यज्ञश्च</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1200ms'}}>स्वाध्यायस्तप</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1400ms'}}>आर्जवम्॥</span>
                                                    </div>
                                                </div>
                                                <cite className="text-orange-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 inline-block" style={{transitionDelay: '1600ms'}}>— भगवद्गीता १६.१</cite>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shloka 5 */}
                            <div className="px-4">
                                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-200/50 hover:border-orange-300 cursor-pointer relative overflow-hidden">
                                    <div className="text-center relative">
                                        {/* English Translation with word-by-word animation */}
                                        <div className="group-hover:opacity-0 transition-opacity duration-700">
                                            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '0ms'}}>Whatever</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '50ms'}}>you</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '100ms'}}>do,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '150ms'}}>whatever</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '200ms'}}>you</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '250ms'}}>eat,</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '300ms'}}>whatever</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '350ms'}}>you</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '400ms'}}>offer</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '450ms'}}>-</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '500ms'}}>do</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '550ms'}}>that</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '600ms'}}>as</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '650ms'}}>offering</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '700ms'}}>to</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600" style={{transitionDelay: '750ms'}}>Divine.</span>
                                            </blockquote>
                                            <cite className="text-orange-600 font-semibold">— Bhagavad Gita 9.27</cite>
                                        </div>
                                        
                                        {/* Sanskrit with staggered entrance animation */}
                                        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="text-center">
                                                <div className="text-2xl lg:text-3xl text-orange-700 font-bold mb-4 leading-relaxed">
                                                    <div className="mb-2">
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>यत्करोषि</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>यदश्नासि</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>यज्जुहोषि</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '800ms'}}>ददासि</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1000ms'}}>यत्।</span>
                                                    </div>
                                                    <div>
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1200ms'}}>यत्तपस्यसि</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1400ms'}}>कौन्तेय</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1600ms'}}>तत्कुरुष्व</span>{' '}
                                                        <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '1800ms'}}>मदर्पणम्॥</span>
                                                    </div>
                                                </div>
                                                <cite className="text-orange-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 inline-block" style={{transitionDelay: '2000ms'}}>— भगवद्गीता ९.२७</cite>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
            
            {/* Products with Free Accessories Section */}
            <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-200/25 to-red-200/25 rounded-full blur-3xl"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    {/* Modern Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-2 rounded-full mb-6">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                            <span className="text-orange-700 font-medium text-sm tracking-wide uppercase">Special Offer</span>
                        </div>
                        
                        <h2 className="text-5xl lg:text-7xl headerstyle mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                            Exclusive deals on must have products
                        </h2>
                        
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Discover our spiritual products that come with complimentary - 
                            get extra value with every purchase for your sacred space
                        </p>
                        
                    </div>{/* Free Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {translations.products.product
                            .filter(product => product.freeAccessories && product.freeAccessories.length > 0)
                            .map((product, index) => (                                  <div key={index} className="group relative">
                                    
                                    {/* Custom Product Card - Make entire card clickable */}
                                    <div 
                                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-orange-100 group-hover:border-orange-400 transform group-hover:-translate-y-3 group-hover:scale-105 cursor-pointer"
                                        onClick={() => window.location.href = `/product/${product.id || index}`}
                                    >
                                        {/* Product Image */}
                                        <div className="relative overflow-hidden">
                                            <img 
                                                src={product.photo.image1 || product.photo.image2 || product.photo.image3} 
                                                alt={product.name || product.title}
                                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            
                                            {/* Price badge on image */}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                                <span className="text-orange-600 font-bold text-lg">₹{product.cost}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Product Details */}
                                        <div className="p-6">                                            
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                                {product.name || product.title}
                                            </h3>
                                            
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {product.description || product.desc}
                                            </p>
                                            
                                            {/* Free Accessories Section */}
                                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-4">
                                                
                                                <div className="flex flex-wrap gap-1">
                                                    {product.freeAccessories.slice(0, 3).map((accessory, idx) => (
                                                        <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                                                            {typeof accessory === 'object' ? accessory.name : accessory}
                                                        </span>
                                                    ))}
                                                    {product.freeAccessories.length > 3 && (
                                                        <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            +{product.freeAccessories.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Action Button */}
                                            <button 
                                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl z-10 relative"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Add to cart functionality here
                                                    console.log('Add to cart:', product);
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                        
                                        {/* Simple hover indicator without blocking overlay */}
                                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                      {/* Call to Action */}
                    <div className="text-center mt-16">
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-orange-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Enhanced Value with Every Purchase
                            </h3>
                            <p className="text-gray-600 mb-6">
                                These spiritual products come with carefully selected free 
                                to complete your sacred space setup and enhance your spiritual practice.
                            </p>
                            <a href="/shop">
                            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Explore All Products →
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Showcase Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        {/* <h3 className='text-[#D88E7D] stylefont text-3xl mb-2'>Our Videos</h3> */}
                        {/* <h2 className="text-5xl headerstyle mb-4">Product Showcases</h2> */}
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
            </section>            {/* Three Features Section with Sanskrit Hover Effect */}
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
                                    className='w-28 relative z-10 transition-transform duration-500 group-hover:scale-110'
                                    src={translations.home.third[`image${num}`]}
                                    alt="product"
                                />
                            </div>
                            
                            <div className='relative overflow-hidden'>
                                {/* English Text (Default) */}
                                <div className='group-hover:opacity-0 transition-all duration-700 group-hover:text-white'>
                                    <h1 className='text-2xl headerstyle mb-2 transition-all duration-500'>
                                        {num === 1 && (
                                            <>
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '0ms'}}>Premium</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '100ms'}}>Quality</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '200ms'}}>Products</span>
                                            </>
                                        )}
                                        {num === 2 && (
                                            <>
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '0ms'}}>Handcrafted</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '100ms'}}>with</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '200ms'}}>Devotion</span>
                                            </>
                                        )}
                                        {num === 3 && (
                                            <>
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '0ms'}}>Sacred</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '100ms'}}>Spiritual</span>{' '}
                                                <span className="inline-block transition-all duration-300 group-hover:scale-110" style={{transitionDelay: '200ms'}}>Items</span>
                                            </>
                                        )}
                                    </h1>
                                    <p className='transition-colors duration-300 group-hover:text-white'>
                                        {num === 1 && "Finest materials and craftsmanship in every spiritual product"}
                                        {num === 2 && "Created by skilled artisans with traditional techniques"}
                                        {num === 3 && "Blessed items for your divine worship and meditation"}
                                    </p>
                                </div>
                                
                                {/* Sanskrit Text (On Hover) */}
                                <div className="absolute inset-0 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-white">
                                    <h1 className='text-2xl headerstyle mb-2'>
                                        {num === 1 && (
                                            <>
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>उत्तम</span>{' '}
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>गुणवत्ता</span>{' '}
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>उत्पाद</span>
                                            </>
                                        )}
                                        {num === 2 && (
                                            <>
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>हस्तशिल्प</span>{' '}
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>भक्ति</span>{' '}
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>युक्त</span>
                                            </>
                                        )}
                                        {num === 3 && (
                                            <>
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '200ms'}}>पवित्र</span>{' '}
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '400ms'}}>आध्यात्मिक</span>{' '}
                                                <span className="inline-block transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{transitionDelay: '600ms'}}>वस्तुएं</span>
                                            </>
                                        )}
                                    </h1>
                                    <p className='transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100' style={{transitionDelay: '800ms'}}>
                                        {num === 1 && "सर्वोत्तम सामग्री और शिल्पकारी"}
                                        {num === 2 && "पारंपरिक तकनीकों से निर्मित"}
                                        {num === 3 && "पूजा और ध्यान के लिए आशीर्वादित"}
                                    </p>
                                </div>
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
                                <strong className='text-orange-300'>Sree Astha Laxmi Sree Dhana Laxmi Akarsha Pack</strong> for unending prosperity. 
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
            </div>            <div>
                <Team />
            </div>
            
            {/* Cookie Consent Component */}
            <CookieConsent />
        </div >
    )
};

export default Home;