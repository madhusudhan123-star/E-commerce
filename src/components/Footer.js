import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';
import translations from '../utils/data';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-[#d99c8d] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="flex flex-col">
                        <img 
                            src={translations?.footerConfig?.contact?.logo} 
                            className="w-40 mb-4" 
                            alt="Company Logo" 
                        />
                        <p className="text-sm mb-6 text-white/80">
                            {translations?.footerConfig?.contact?.sub}
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex flex-wrap gap-3 mt-auto">
                            <a 
                                href="https://www.instagram.com/sacredrelm/" 
                                className="bg-white/10 hover:bg-white/30 p-2.5 rounded-full transition-all duration-300"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a 
                                href="http://www.youtube.com/@sacredrelm" 
                                className="bg-white/10 hover:bg-white/30 p-2.5 rounded-full transition-all duration-300"
                                aria-label="YouTube"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                            {/* Additional social icons can be uncommented when needed */}
                            {/* <a href="#" className="bg-white/10 hover:bg-white/30 p-2.5 rounded-full transition-all duration-300" aria-label="Facebook">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-white/30 p-2.5 rounded-full transition-all duration-300" aria-label="Twitter">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-white/30 p-2.5 rounded-full transition-all duration-300" aria-label="LinkedIn">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a> */}
                        </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-12 after:h-1 after:bg-white/50">
                            {translations?.footerConfig?.contact?.title}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="w-5 h-5 mt-1 text-white/70" />
                                <span>{translations?.footerConfig?.contact?.address}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="w-5 h-5 mt-1 text-white/70" />
                                <a href={`mailto:${translations?.footerConfig?.contact?.email}`} className="hover:underline transition-all">
                                    {translations?.footerConfig?.contact?.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPhone className="w-5 h-5 mt-1 text-white/70" />
                                <a href={`tel:${translations?.footerConfig?.contact?.phone}`} className="hover:underline transition-all">
                                    {translations?.footerConfig?.contact?.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Useful Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-12 after:h-1 after:bg-white/50">
                            {translations?.footerConfig?.usefulLinks?.title}
                        </h3>
                        <ul className="space-y-3">
                            {translations?.footerConfig?.usefulLinks?.links?.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.url} 
                                        className="hover:translate-x-2 flex items-center gap-2 transition-all duration-300 hover:text-white/80"
                                    >
                                        <FaArrowRight size={12} className="opacity-70" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Business Hours */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-12 after:h-1 after:bg-white/50">
                            Business Hours
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between">
                                <span>Monday - Friday:</span>
                                <span className="text-white/80">9:00 AM - 5:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Saturday:</span>
                                <span className="text-white/80">10:00 AM - 3:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom Section with Copyright and Terms */}
            <div className="border-t border-white/20 py-6 bg-[#c88f80]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-white/80">
                            {translations?.footerConfig?.bottomSection?.copyright?.replace('{year}', currentYear)}
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm text-white/80">
                            <a href={translations?.footerConfig?.bottomSection?.terms?.url} className="hover:text-white transition-colors">
                                {translations?.footerConfig?.bottomSection?.terms?.text}
                            </a>
                            <a href={translations?.footerConfig?.bottomSection?.terms?.url2} className="hover:text-white transition-colors">
                                {translations?.footerConfig?.bottomSection?.terms?.text2}
                            </a>
                            <a href={translations?.footerConfig?.bottomSection?.terms?.url3} className="hover:text-white transition-colors">
                                {translations?.footerConfig?.bottomSection?.terms?.text3}
                            </a>
                            <a href={translations?.footerConfig?.bottomSection?.terms?.url4} className="hover:text-white transition-colors">
                                {translations?.footerConfig?.bottomSection?.terms?.text4}
                            </a>
                            <a href={translations?.footerConfig?.bottomSection?.terms?.url5} className="hover:text-white transition-colors">
                                {translations?.footerConfig?.bottomSection?.terms?.text5}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;