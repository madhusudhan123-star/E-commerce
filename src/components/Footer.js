import React from 'react';
import translations from '../utils/data';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#d99c8d] text-white py-10 p-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info Section */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold mb-3">{translations?.footerConfig?.contact?.title}</h3>
                        <p>{translations?.footerConfig?.contact?.address}</p>
                        <p>{translations?.footerConfig?.contact?.email}</p>
                        <p>{translations?.footerConfig?.contact?.phone}</p>
                    </div>

                    {/* Logo and Social Media Section */}
                    <div className="flex flex-col items-center">
                        <img src={translations?.footerConfig?.contact?.logo} className='w-32' alt="logo" />
                        <p className="text-sm text-center">
                            {translations?.footerConfig?.contact?.sub}
                        </p>
                    </div>

                    {/* Useful Links Section */}
                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold mb-3">{translations?.footerConfig?.usefulLinks?.title}</h3>
                        <ul className="space-y-2">
                            {translations?.footerConfig?.usefulLinks?.links?.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className="hover:underline">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white mt-8 pt-4 text-center">
                    <p>{translations?.footerConfig?.bottomSection?.copyright?.replace('{year}', new Date().getFullYear())}</p>
                    <p className="mt-2 flex gap-2 justify-center">
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
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;