import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
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
            <div className='h-screen z-0'>
                <div className="h-screen">
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className="mySwiper w-full h-full"
                    >
                        <SwiperSlide className={`flex justify-center items-center text-center text-lg siderone `}>
                            <div className='w-screen h-screen flex flex-row bg-[#f5f5f58f] xl:bg-transparent lg:bg-transparent  md:bg-transparent sm:bg-[#f5f5f58f]'>

                                <div className='w-1/2 hidden lg:block md:block sm:block '>
                                </div>
                                <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full flex flex-col justify-center items-center'>
                                    <div className='text-center xl:text-start md:text-start sm:text-start '>
                                        <motion.div
                                            initial={{ x: -200, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }}>{translations.home.header.short1}</motion.div>
                                        <motion.div
                                            initial={{ x: -200, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }} className='text-4xl font-bold'>{translations.home.header.title1}</motion.div>
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
                            <div className='w-screen h-screen flex flex-row bg-[#f5f5f58f] xl:bg-transparent lg:bg-transparent  md:bg-transparent sm:bg-[#f5f5f58f]'>
                                <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full flex flex-col justify-center items-center'>
                                    <motion.div
                                        initial={{ x: -200, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }} className='text-center xl:text-end md:text-end sm:text-center '>
                                        <h1>{translations.home.header.short2}</h1>
                                        <h1 className='text-4xl font-bold'>{translations.home.header.title2}</h1>
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
                            <div className='w-screen h-screen flex flex-row bg-[#f5f5f58f] xl:bg-transparent lg:bg-transparent  md:bg-transparent sm:bg-[#f5f5f58f]'>

                                <div className='w-1/2 hidden lg:block md:block sm:block '>

                                </div>
                                <div className=' flex flex-col justify-center items-center'>
                                    <motion.div
                                        initial={{ x: -200, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }} className='text-center xl:text-start md:text-start sm:text-start '>
                                        <h1>{translations.home.header.short3}</h1>
                                        <h1 className='text-4xl font-bold'>{translations.home.header.title3}</h1>
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
                                <h1 className='text-xl font-bold'>{translations.home.third[`title${num}`]}</h1>
                                <p>{translations.home.third[`subtitle${num}`]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <section className="py-10 bg-gray-100">
                    <div className="text-center">
                        <h3 className='text-[#D88E7D]'>{translations.home.fourth.short}</h3>
                        <h2 className="text-5xl font-bold">{translations.home.fourth.title}</h2>
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
                <div className='pb-10 h-[70vh]'>
                    <div className='flex h-full backgroundimagechange flex-col w-full lg:flex-row md:flex-row sm:flex-row'>
                        <div className='w-1/2 p-8'>
                        </div>
                        <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full p-10 text-white'>
                            <h1 className='text-lg mb-5'>{translations.home.second.short}</h1>
                            <h1 className='text-7xl font-medium mb-8'>{translations.home.second.title}</h1>
                            <p className='mb-4'>{translations.home.second.subtitle}</p>
                            <button className='bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl'><a href={translations.about.second.linkbutton}>{translations.home.header.button1}</a></button>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <section className="py-10 bg-gray-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">{translations.home.cartitle}</h2>
                        <p className="text-2xl mt-2 text-red-500">{translations.home.catsub}</p>
                    </div>

                    {/* Categories */}
                    <div className="flex justify-center gap-4 mt-6 flex-wrap">
                        {translations.home.categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 text-lg font-medium  ${selectedCategory === category
                                    ? 'bg-red-500 text-white border-red-500'
                                    : 'text-gray-700 border-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto px-4">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative aspect-[4/3] w-full"
                                >
                                    <div className="absolute inset-0 hover:bg-gradient-to-r from-zinc-900 to-transparent z-10" />

                                    <img
                                        src={product.image}
                                        alt={product.category}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
            </div>
            <div>
                <section className="bg-white py-16 px-4 relative">
                    {/* Title Section */}
                    <div className="text-center mb-12">
                        <h3 className="text-xl font-serif italic text-red-500">{translations.home.faqtitle}</h3>
                        <h2 className="text-4xl font-bold text-gray-900">{translations.home.faqsub}</h2>
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
                <div className='pb-10 h-[70vh]'>
                    <div className='flex h-full backgroundimagechange2 flex-col w-full lg:flex-row md:flex-row sm:flex-row'>
                        <div className='w-1/2 p-8'>
                        </div>
                        <div className='w-full lg:w-1/2 md:w-1/2 sm:w-full p-10 text-white text-center flex justify-center flex-col items-center'>
                            <h1 className='text-lg mb-5'>{translations.home.nine.short}</h1>
                            <h1 className='text-5xl mb-8'>{translations.home.nine.title}</h1>
                            <p className='mb-4'>{translations.home.second.subtitle}</p>
                            <button className='bg-[#D88E7D] hover:bg-[#514B60] text-white px-6 py-3 rounded-3xl'><a href={translations.about.second.linkbutton}>
                                {translations.home.header.button1}
                            </a>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Team />
            </div>
        </div >
    )
};

export default Home;


