import React from 'react';
import translations from '../utils/data';
import SecondComponent from '../components/Second';
import Horizontal from '../components/Horziental';
import Team from '../components/Team';
import Other from '../components/Other';
import { motion } from 'framer-motion';
import { FaGem, FaHands, FaOm, FaPrayingHands, FaShieldAlt, FaPeace, FaHistory, FaDharmachakra } from 'react-icons/fa';
import sar from '../assets/main/mobilebanner.webp'
import aly from '../assets/main/img1.webp';


const About = () => {
    // Animation variants for scroll effects
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    return (
        <div className='relative z-0'>
            {/* Header Section */}
            <div>
                <Other title={translations.about.title} subtitle={translations.about.subtitle} />
            </div>
            
            {/* SecondComponent Banner */}
            {/* <div className='relative'>
                <SecondComponent translations={translations} page="about" />
            </div> */}
            
            {/* Our Sacred Products Section */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl stylefont text-[#DA9687] mb-2">Our Divine Collection</h2>
                        <h3 className="text-4xl headerstyle text-gray-800 mb-6">Sacred Spiritual Products</h3>
                        <p className="max-w-3xl mx-auto text-gray-600">
                            Each of our spiritual products is meticulously crafted with devotion and traditional techniques, 
                            designed to bring divine energy and blessings into your home and life.
                        </p>
                    </motion.div>
                    
                    {/* Product Showcases */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Sree Anjaneya Shani Raksha */}
                        <motion.div 
                            className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30"></div>
                                <img 
                                    src={sar} 
                                    alt="Sree Anjaneya Shani Raksha" 
                                    className="w-full h-full transform hover:scale-105 transition-all duration-700"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/400x400?text=Sree+Anjaneya";
                                    }}
                                />
                            </div>
                            <div className="p-6 md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Sree Anjaneya Shani Raksha</h3>
                                <p className="text-gray-600 mb-4">
                                    A powerful divine protective idol that shields your home and family from negative energies 
                                    and Shani doshas. Lord Hanuman's blessing provides strength, courage, and spiritual protection.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center">
                                        <FaShieldAlt className="text-orange-600 mr-2" />
                                        <span className="text-sm">Protection</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaPeace className="text-orange-600 mr-2" />
                                        <span className="text-sm">Inner Strength</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaOm className="text-orange-600 mr-2" />
                                        <span className="text-sm">Divine Energy</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Sree Astha Laxmi */}
                        <motion.div 
                            className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-green-500/30"></div>
                                <img 
                                    src={aly} 
                                    alt="Sree Astha Laxmi" 
                                    className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/400x400?text=Sree+Laxmi";
                                    }}
                                />
                            </div>
                            <div className="p-6 md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Sree Astha Laxmi</h3>
                                <p className="text-gray-600 mb-4">
                                    Invoke the blessings of eight forms of Goddess Lakshmi with this sacred idol. 
                                    Designed to attract prosperity, abundance, and good fortune into your life and business.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center">
                                        <FaGem className="text-green-600 mr-2" />
                                        <span className="text-sm">Prosperity</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaHands className="text-green-600 mr-2" />
                                        <span className="text-sm">Abundance</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaDharmachakra className="text-green-600 mr-2" />
                                        <span className="text-sm">Divine Grace</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Craftsmanship Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl stylefont text-[#DA9687] mb-2">Sacred Artisanship</h2>
                        <h3 className="text-4xl headerstyle text-gray-800 mb-6">Our Craftsmanship Journey</h3>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <motion.div 
                            className="bg-white rounded-xl p-6 shadow-md"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                            }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#DA9687] to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">1</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Traditional Materials Selection</h4>
                            <p className="text-gray-600">
                                We source only the finest quality materials that honor ancient traditions. 
                                Our master artisans carefully select materials that maintain spiritual purity and lasting beauty.
                            </p>
                        </motion.div>
                        
                        {/* Step 2 */}
                        <motion.div 
                            className="bg-white rounded-xl p-6 shadow-md"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
                            }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#DA9687] to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">2</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Handcrafted with Devotion</h4>
                            <p className="text-gray-600">
                                Each piece is lovingly handcrafted by skilled artisans who perform their work with devotion and 
                                reverence. Many of our craftspeople come from families with generations of temple art expertise.
                            </p>
                        </motion.div>
                        
                        {/* Step 3 */}
                        <motion.div 
                            className="bg-white rounded-xl p-6 shadow-md"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
                            }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#DA9687] to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">3</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Sacred Blessing Ceremony</h4>
                            <p className="text-gray-600">
                                Before reaching you, each idol undergoes a traditional blessing ceremony performed by 
                                qualified priests, infusing the piece with sacred energy and divine vibrations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Brand Story Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10 about-page-bg"></div>
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        className="max-w-3xl mx-auto text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl stylefont text-[#DA9687] mb-2">Our Journey</h2>
                        <h3 className="text-4xl headerstyle text-gray-800 mb-6">The Sacred Realm Story</h3>
                        <p className="text-gray-600">
                            Sacred Realm began with a vision to connect people with authentic spiritual products that 
                            embody true cultural heritage. Our founder's journey across India's spiritual centers 
                            led to partnerships with traditional artisan families who create these divine pieces with devotion.
                        </p>
                    </motion.div>
                    
                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#DA9687]/30"></div>
                        
                        {/* Timeline events */}
                        <div className="grid grid-cols-1 gap-12">
                            {/* First event */}
                            <motion.div 
                                className="flex flex-col md:flex-row items-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                                }}
                            >
                                <div className="md:w-1/2 md:pr-12 md:text-right">
                                    <h4 className="text-xl font-bold text-gray-800 mb-1">Spiritual Discovery</h4>
                                    <p className="text-gray-500 mb-2">2009</p>
                                    <p className="text-gray-600">
                                        Our founder traveled throughout India's spiritual centers, learning about sacred art 
                                        and the significance of divine idols in homes and temples.
                                    </p>
                                </div>
                                <div className="mx-auto md:mx-0 my-4 md:my-0 z-10 w-12 h-12 bg-[#DA9687] rounded-full flex items-center justify-center">
                                    <FaHistory className="text-white text-lg" />
                                </div>
                                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
                            </motion.div>
                            
                            {/* Second event */}
                            <motion.div 
                                className="flex flex-col md:flex-row items-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                                }}
                            >
                                <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                                <div className="mx-auto md:mx-0 my-4 md:my-0 z-10 w-12 h-12 bg-[#DA9687] rounded-full flex items-center justify-center">
                                    <FaPrayingHands className="text-white text-lg" />
                                </div>
                                <div className="md:w-1/2 md:pl-12 md:text-left">
                                    <h4 className="text-xl font-bold text-gray-800 mb-1">Sacred Realm Begins</h4>
                                    <p className="text-gray-500 mb-2">2015</p>
                                    <p className="text-gray-600">
                                        Sacred Realm was established to bridge the gap between traditional artisans and 
                                        spiritual seekers looking for authentic divine products.
                                    </p>
                                </div>
                            </motion.div>
                            
                            {/* Third event */}
                            <motion.div 
                                className="flex flex-col md:flex-row items-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                                }}
                            >
                                <div className="md:w-1/2 md:pr-12 md:text-right">
                                    <h4 className="text-xl font-bold text-gray-800 mb-1">Today's Sacred Realm</h4>
                                    <p className="text-gray-500 mb-2">Present</p>
                                    <p className="text-gray-600">
                                        Today, we connect thousands of homes with divine energy through our blessed products, 
                                        while supporting traditional artisans and preserving ancient craftsmanship.
                                    </p>
                                </div>
                                <div className="mx-auto md:mx-0 my-4 md:my-0 z-10 w-12 h-12 bg-[#DA9687] rounded-full flex items-center justify-center">
                                    <FaOm className="text-white text-lg" />
                                </div>
                                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            
            
            {/* Team Section */}
            <div className="pb-16">
                <Team />
            </div>
            
            {/* Spiritual Significance Section */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl stylefont text-[#DA9687] mb-2">Divine Significance</h2>
                        <h3 className="text-4xl headerstyle text-gray-800 mb-6">Spiritual Benefits of Our Products</h3>
                        <p className="max-w-3xl mx-auto text-gray-600">
                            Each item in our collection carries specific spiritual energy designed to enhance various aspects of your life.
                            Learn how these sacred objects can create positive transformations in your home and spiritual journey.
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Benefit Card 1 */}
                        <motion.div 
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mb-4">
                                <FaShieldAlt className="text-orange-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Protection & Safety</h3>
                            <p className="text-gray-600">
                                Our protective idols create a shield of divine energy around your home and family, guarding against 
                                negative influences, evil eye, and harmful vibrations.
                            </p>
                        </motion.div>
                        
                        {/* Benefit Card 2 */}
                        <motion.div 
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }
                            }}
                        >
                            <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4">
                                <FaGem className="text-green-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Prosperity & Abundance</h3>
                            <p className="text-gray-600">
                                Invoke wealth, prosperity and abundance with our specially crafted spiritual idols and yantras that 
                                attract positive financial energy into your home and business.
                            </p>
                        </motion.div>
                        
                        {/* Benefit Card 3 */}
                        <motion.div 
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
                            }}
                        >
                            <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                                <FaPeace className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Peace & Harmony</h3>
                            <p className="text-gray-600">
                                Create a sanctuary of peace in your home with our calming spiritual items that promote inner 
                                tranquility, better relationships, and mental clarity.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;