import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, } from 'swiper/modules';
import translations from '../utils/data';
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from '../components/ProductCard';
import bg from '../assets/home/bg-test.png';
import SecondComponent from '../components/Second';
import Horizontal from '../components/Horziental';
import Team from '../components/Team';






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
            
    return (
        <div>
            <div className='h-full lg:h-screen md:h-screen sm:h-full'>
                <div className="h-full lg:h-screen md:h-screen sm:h-full">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        className="mySwiper w-full h-full"
                    >
                        <SwiperSlide className={`flex justify-center items-center text-center text-lg siderone `}>
                            <div className='w-screen lg:h-screen md:h-screen flex flex-row bg-[#f5f5f58f] xl:bg-transparent lg:bg-transparent  md:bg-transparent sm:bg-[#f5f5f58f]'>

                                <div className='w-1/2 hidden lg:block md:block sm:block '>
                                </div>
                                <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full flex flex-col justify-center items-center'>
                                    <div className='text-center xl:text-start md:text-start sm:text-start '>
                                        <motion.div
                                            initial={{ x: -200, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }} className="stylefont text-4xl">{translations.home.header.short1}</motion.div>
                                        <motion.div
                                            initial={{ x: -200, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }} className='text-6xl  headerstyle'>{translations.home.header.title1}</motion.div>
                                        <motion.div
                                            initial={{ x: -200, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }} className='w-full xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-2/3'>{translations.home.header.subtitle1}</motion.div>
                                        <motion.div
                                            initial={{ x: -200, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }}>

                                            <button className='bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl'>
                                                <a href={translations.about.second.linkbutton}>

                                                    {translations.home.header.button1}
                                                </a>
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className={`flex justify-center items-center text-center text-lg slidertwo `}>
                            <div className='w-screen lg:h-screen md:h-screen flex flex-row bg-[#f5f5f58f] xl:bg-transparent lg:bg-transparent  md:bg-transparent sm:bg-[#f5f5f58f]'>
                                <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full flex flex-col justify-center items-center'>
                                    <motion.div
                                        initial={{ x: -200, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }} className='text-center xl:text-end md:text-end sm:text-center '>
                                        <h1 className='stylefont text-4xl'>{translations.home.header.short2}</h1>
                                        <h1 className='text-6xl  headerstyle'>{translations.home.header.title2}</h1>
                                        <p className=''>{translations.home.header.subtitle2}</p>
                                        <button className='bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl'> <a href={translations.about.second.linkbutton}>
                                            {translations.home.header.button1}
                                        </a>
                                        </button>
                                    </motion.div>
                                </div>
                                <div className=' hidden lg:block md:block sm:block'></div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className={`flex justify-center items-center text-center text-lg sliderthree `}>
                            <div className='w-screen lg:h-screen md:h-screen flex flex-row bg-[#f5f5f58f] xl:bg-transparent lg:bg-transparent  md:bg-transparent sm:bg-[#f5f5f58f]'>

                                <div className='w-1/2 hidden lg:block md:block sm:block '>

                                </div>
                                <div className=' flex flex-col justify-center items-center'>
                                    <motion.div
                                        initial={{ x: -200, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }} className='text-center xl:text-start md:text-start sm:text-start '>
                                        <h1 className='stylefont text-4xl'>{translations.home.header.short3}</h1>
                                        <h1 className='text-6xl  headerstyle'>{translations.home.header.title3}</h1>
                                        <p className='w-full xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-2/3'>{translations.home.header.subtitle3}</p>
                                        <button className='bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl'><a href={translations.about.second.linkbutton}>
                                            {translations.home.header.button1}
                                        </a>
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className='relative'>
                <SecondComponent translations={translations} page="home" />
            </div>
            <section className="product-video-section py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* <div className="col-md-10 text-center mb-4">
                            <h2 className="section-title">See Our Products in Action</h2>
                            <p className="lead">Watch how our quality products can enhance your lifestyle</p>
                        </div> */}
                        <div className="col-md-8">
                            <div className="video-container">
                                <iframe 
                                    width="100%" 
                                    height="480" 
                                    src="https://www.youtube.com/embed/IOxef5l-KFc" 
                                    title="Product Showcase" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
            <div>
                <div className='pb-10 h-[70vh] relative overflow-hidden'>
                    <div className='flex h-full backgroundimagechange flex-col w-full lg:flex-row md:flex-row sm:flex-row relative'>
                        {/* Gradient overlay for better text readability */}
                        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10'></div>
                        
                        <div className='w-1/2 p-8 relative z-20'>
                            {/* Left side can contain product showcase or remain empty for background focus */}
                        </div>
                        
                        <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full p-10 text-white relative z-20'>
                            {/* Main heading with enhanced styling */}
                            <h1 className='text-2xl mb-3 text-orange-300 stylefont tracking-wide'>
                                Divine Blessings Await
                            </h1>
                            
                            <h1 className='text-4xl lg:text-5xl xl:text-6xl headerstyle mb-6 leading-tight'>
                                <span className='bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent'>
                                    Sacred Idols for Protection
                                </span>
                                <br />
                                <span className='text-orange-300'>
                                    and Prosperity
                                </span>
                            </h1>
                            
                            {/* Enhanced description */}
                            <p className='mb-6 text-lg text-gray-200 leading-relaxed max-w-lg'>
                                Bring home divine protection with <strong className='text-orange-300'>Sree Anjaneya</strong> and 
                                abundance with <strong className='text-orange-300'>Sree Astha Laxmi</strong>. 
                                Handcrafted with devotion, blessed with tradition.
                            </p>
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

                        {/* Image Section */}
                        <div className="hidden md:block relative w-full md:w-1/2">
                            <img
                                src={translations.home.images}
                                alt="Meditation"
                                className="w-full rounded-lg"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <Horizontal data={translations.home.horizontal} />
            </div>
            <div>
                <div className='pb-10 h-[70vh] relative overflow-hidden'>
                    <div className='flex h-full backgroundimagechange2 flex-col w-full lg:flex-row md:flex-row sm:flex-row relative'>
                        {/* Gradient overlay for better text readability */}
                        <div className='absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent z-10'></div>
                        
                        <div className='w-1/2 p-8 relative z-20'>
                            {/* Left side showcases the spiritual products in background */}
                        </div>
                        
                        <div data-aos="zoom-in-up" className='w-full lg:w-1/2 md:w-1/2 sm:w-full p-10 text-white text-center flex justify-center flex-col items-center relative z-20'>    
                            {/* Main heading with enhanced styling */}
                            <h1 className='text-3xl mb-5 text-amber-300 stylefont tracking-wide'>
                                {translations.home.nine.short}
                            </h1>
                            
                            <h1 className='text-4xl lg:text-5xl xl:text-6xl headerstyle mb-8 leading-tight'>
                                <span className='bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent'>
                                    Handcrafted Spiritual
                                </span>
                                <br />
                                <span className='text-amber-300'>
                                    Products
                                </span>
                            </h1>
                            
                            {/* Enhanced description */}
                            <p className='mb-8 text-lg text-gray-200 leading-relaxed max-w-2xl'>
                                Each of our sacred idols and spiritual decor pieces is lovingly handcrafted by 
                                skilled artisans. Discover unique designs that blend timeless tradition with 
                                exquisite craftsmanship, perfect for home puja, gifting, and adding divine 
                                grace to any space.
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
            {/* Product Video Section - Add this after your second section */}

        </div >
    )
};

export default Home;