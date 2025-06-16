import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import translations from '../utils/data';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#d99c8d] text-white py-12 p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Information Section */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-4">{translations?.footerConfig?.contact?.title}</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center md:justify-start justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                <span>{translations?.footerConfig?.contact?.address}</span>
                            </li>
                            <li className="flex items-center md:justify-start justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                <span>{translations?.footerConfig?.contact?.email}</span>
                            </li>
                            <li className="flex items-center md:justify-start justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                <span>{translations?.footerConfig?.contact?.phone}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Logo and Social Media Section */}
                    <div className="flex flex-col items-center">
                        <img src={translations?.footerConfig?.contact?.logo} className='w-40 mb-4' alt="logo" />
                        <p className="text-sm text-center mb-4">
                            {translations?.footerConfig?.contact?.sub}
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-2">
                            <a href="#" className="hover:text-white transition-colors duration-300 bg-white/20 p-2 rounded-full">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-300 bg-white/20 p-2 rounded-full">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-300 bg-white/20 p-2 rounded-full">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-300 bg-white/20 p-2 rounded-full">
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors duration-300 bg-white/20 p-2 rounded-full">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Useful Links Section */}
                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-bold mb-4">{translations?.footerConfig?.usefulLinks?.title}</h3>
                        <ul className="space-y-2">
                            {translations?.footerConfig?.usefulLinks?.links?.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className="hover:underline transition-all duration-300 hover:text-white hover:ml-1">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright and Terms Section */}
                <div className="border-t border-white/50 mt-8 pt-6 text-center">
                    <p className="text-sm">{translations?.footerConfig?.bottomSection?.copyright?.replace('{year}', new Date().getFullYear())}</p>
                    <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
                        <a href={translations?.footerConfig?.bottomSection?.terms?.url} className="hover:underline">
                            {translations?.footerConfig?.bottomSection?.terms?.text}
                        </a>
                        <a href={translations?.footerConfig?.bottomSection?.terms?.url2} className="hover:underline">
                            {translations?.footerConfig?.bottomSection?.terms?.text2}
                        </a>
                        <a href={translations?.footerConfig?.bottomSection?.terms?.url3} className="hover:underline">
                            {translations?.footerConfig?.bottomSection?.terms?.text3}
                        </a>
                        <a href={translations?.footerConfig?.bottomSection?.terms?.url4} className="hover:underline">
                            {translations?.footerConfig?.bottomSection?.terms?.text4}
                        </a>
                        <a href={translations?.footerConfig?.bottomSection?.terms?.url5} className="hover:underline">
                            {translations?.footerConfig?.bottomSection?.terms?.text5}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;