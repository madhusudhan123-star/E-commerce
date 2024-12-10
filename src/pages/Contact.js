import React, { useState } from 'react'
import translations from '../utils/data'
import Other from '../components/Other'
import { FaMapMarkerAlt, FaPhone, FaBuilding } from 'react-icons/fa';
import aboutdesign from '../assets/home/about.webp';


function Contact() {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        setStatus('submitting');

        try {
            const response = await fetch("https://formspree.io/f/manyjjpb", {
                method: "POST",
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };
    return (
        <div>
            <div>
                <Other title={translations.contact.title} subtitle={translations.contact.subtitle} />
            </div>
            <div>
                <div>
                    <div className="flex justify-center p-20 gap-10 flex-wrap relative">
                        <img src={aboutdesign} className='absolute right-0 top-0 hidden lg:block md:block' />
                        <div className='w-full lg:w-1/4 md:w-1/4'>
                            <h1 className='text-7xl'>{translations.contact.section.title}</h1>
                            <p className='text-xl'>{translations.contact.section.sub}</p>
                        </div>
                        {translations.contact.section?.branches?.map((item, index) => (
                            <div
                                key={index}
                                className="group relative p-6 rounded-lg cursor-pointer overflow-hidden"
                                style={{ zIndex: 1 }}
                            >
                                {/* Background overlay with right-to-left animation */}
                                <div
                                    className="absolute inset-0 bg-[#D88E7D] transform translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"
                                    style={{ zIndex: -1 }}
                                />

                                {/* Content with hover text color change */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <FaBuilding className="text-2xl text-[#D88E7D] group-hover:text-white transition-colors duration-300" />
                                        <h3 className="text-4xl group-hover:text-white transition-colors duration-300">{item.title}</h3>
                                    </div>
                                    <div className="flex items-start gap-3 mb-2">
                                        <FaMapMarkerAlt className="text-xl text-[#D88E7D] mt-1 group-hover:text-white transition-colors duration-300" />
                                        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">{item.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaPhone className="text-xl text-[#D88E7D] group-hover:text-white transition-colors duration-300" />
                                        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">{item.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className='w-screen h-screen '>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28943.614735315532!2d78.465638!3d17.446136!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91cd07585bcd%3A0xb10cf49e7038d870!2sISRAELITES%20SHOPPING%20NETWORK%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1727708685071!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
            <div className='container mx-auto'>
                <div className='flex flex-wrap lg:flex-nowrap md:flex-nowrap p-6 lg:p-20 md:p-20 items-center gap-10'>
                    <div className='w-full lg:w-1/2 md:w-1/2'>
                        <h1 className='text-5xl mb-6'>{translations.contact.submit.title}</h1>
                        <p className='mb-6'>{translations.contact.submit.sub}</p>
                        <img src={translations.contact.submit.img} className='' alt="contact" />
                    </div>
                    <div className='w-full lg:w-1/2 md:w-1/2'>
                        {status === 'success' && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                Message sent successfully!
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                Failed to send message. Please try again.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-start'>
                            <h3 className='text-2xl mb-5'>{translations.contact.submit.short}</h3>
                            <h1 className='text-5xl mb-6'>{translations.contact.submit.title2}</h1>
                            <input
                                type='text'
                                name="name"
                                placeholder='Name'
                                required
                                className='p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-[#D88E7D]'
                            />
                            <input
                                type='email'
                                name="email"
                                placeholder='Email'
                                required
                                className='p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-[#D88E7D]'
                            />
                            <input
                                type='text'
                                name="subject"
                                placeholder='Subject'
                                required
                                className='p-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-[#D88E7D]'
                            />
                            <textarea
                                name="message"
                                placeholder='Message'
                                required
                                className='p-3 rounded-lg border w-full h-52 focus:outline-none focus:ring-2 focus:ring-[#D88E7D]'
                            ></textarea>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className='bg-[#D88E7D] text-white p-3 rounded-lg hover:bg-[#c27c6d] transition-colors disabled:opacity-50'
                            >
                                {status === 'submitting' ? 'Sending...' : translations.contact.submit.button}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact