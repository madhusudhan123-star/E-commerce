import React, { useState } from 'react'
import translations from '../utils/data'
import Other from '../components/Other'
import { FaMapMarkerAlt, FaPhone, FaBuilding, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import aboutdesign from '../assets/home/about.webp';


function Contact() {
    // Add state for form data and submission status
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ submitting: true, submitted: false, error: null });
        
        try {
            // Get form data
            const form = e.target;
            const name = formData.name || form.querySelector('[name="name"]').value;
            const email = formData.email || form.querySelector('[name="email"]').value;
            const subject = formData.subject || form.querySelector('[name="subject"]').value;
            const message = formData.message || form.querySelector('[name="message"]').value;
            
            // Format message to include sender info and domain name
            const formattedMessage = `
                Message from: ${name}
                Sender Email: ${email}
                Submitted via: SacredRelm.com Contact Form
                
                ${message}
            `;
            
            // Call our backend API instead of Formspree
            const response = await fetch("https://razorpaybackend-wgbh.onrender.com/send-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    to: "israelitesshopping171@gmail.com", // Destination email
                    subject: `[SacredRelm.com] ${subject || "New Contact Form Submission"}`,
                    message: formattedMessage
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Success handling
                setSubmitStatus({ submitting: false, submitted: true, error: null });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                form.reset();
            } else {
                throw new Error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus({ 
                submitting: false, 
                submitted: false, 
                error: error.message || "Failed to send message. Please try again later."
            });
        }
    };
    return (
        <div className="pb-8 bg-[#faebd7]">
            <div>
                <Other title={translations.contact.title} subtitle={translations.contact.subtitle} />
            </div>
            
            {/* Branch Section - Mobile Optimized */}
            <div>
                <div className="relative">
                    <div className="flex justify-center p-4 sm:p-8 md:p-20 gap-4 sm:gap-6 md:gap-10 flex-wrap relative">
                        <img src={aboutdesign} className='absolute right-0 top-0 hidden lg:block max-w-xs xl:max-w-md opacity-80' alt="Decorative background" />
                        {/* <div className='w-full lg:w-1/4 md:w-1/3 mb-6 md:mb-0'>
                            <h1 className='text-4xl sm:text-6xl md:text-8xl headerstyle'>{translations.contact.section.title}</h1>
                            <p className='text-base sm:text-lg md:text-xl mt-2'>{translations.contact.section.sub}</p>
                        </div> */}
                        
                        {/* Branch Cards - Touch-friendly design */}
                        {translations.contact.section?.branches?.map((item, index) => (
                            <div
                                key={index}
                                className="group relative p-4 sm:p-6 rounded-lg cursor-pointer overflow-hidden border border-gray-100 shadow-sm hover:shadow-md w-full sm:w-auto transition-all duration-300"
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
                                        <FaBuilding className="text-xl sm:text-2xl text-[#D88E7D] group-hover:text-white transition-colors duration-300" />
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl headerstyle group-hover:text-white transition-colors duration-300">{item.title}</h3>
                                    </div>
                                    <div className="flex items-start gap-3 mb-2">
                                        <FaMapMarkerAlt className="text-lg sm:text-xl text-[#D88E7D] mt-1 group-hover:text-white transition-colors duration-300" />
                                        <p className="text-gray-600 text-sm sm:text-base group-hover:text-white transition-colors duration-300">{item.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaPhone className="text-lg sm:text-xl text-[#D88E7D] group-hover:text-white transition-colors duration-300" />
                                        <a href={`tel:${item.phone.replace(/\s+/g, '')}`} className="text-gray-600 text-sm sm:text-base group-hover:text-white transition-colors duration-300 hover:underline">
                                            {item.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Google Map - Mobile Optimized */}
            <div className="mt-8 mb-8">
                {/* <div className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28943.614735315532!2d78.465638!3d17.446136!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91cd07585bcd%3A0xb10cf49e7038d870!2sISRAELITES%20SHOPPING%20NETWORK%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1727708685071!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                        className="shadow-md rounded-lg"
                    ></iframe>
                </div> */}
            </div>
            
            {/* Contact Form Section - Mobile Optimized */}
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row md:flex-row p-4 sm:p-6 lg:p-10 items-center gap-6 sm:gap-8 lg:gap-10 bg-white shadow-sm rounded-lg'>
                    <div className='w-full lg:w-1/2 md:w-1/2'>
                        <h2 className='text-3xl sm:text-4xl lg:text-6xl mb-4 sm:mb-6 headerstyle'>{translations.contact.submit.title}</h2>
                        <p className='mb-4 sm:mb-6 text-gray-600'>{translations.contact.submit.sub}</p>
                        <div className="relative w-full h-48 sm:h-64 md:h-auto mb-6 overflow-hidden rounded-lg">
                            <img 
                                src={translations.contact.submit.img} 
                                className='w-full h-full object-cover transition-transform duration-500 hover:scale-105' 
                                alt="contact" 
                            />
                        </div>
                        
                        {/* Contact Info Cards - Mobile Optimized */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            <div className="flex items-start bg-[#faebd7] p-3 rounded-lg">
                                <div className="bg-[#D88E7D]/20 p-2 rounded-full mr-3">
                                    <FaPhone className="text-[#D88E7D]" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Phone</h4>
                                    <a href="tel:+919392277389" className="text-sm text-gray-600 hover:text-[#D88E7D]">
                                        +91 939 227 7389
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start bg-gray-50 p-3 rounded-lg">
                                <div className="bg-[#D88E7D]/20 p-2 rounded-full mr-3">
                                    <FaEnvelope className="text-[#D88E7D]" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a href="mailto:customercareproductcenter@gmail.com" className="text-sm text-gray-600 hover:text-[#D88E7D] break-words">
                                    customercareproductcenter@gmail.com

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form - Mobile Optimized */}
                    <div className='w-full lg:w-1/2 md:w-1/2 bg-gray-50 p-4 sm:p-6 rounded-lg'>
                        {submitStatus.submitted && (
                            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}
                        {submitStatus.error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                Failed to send message. Please try again.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-start'>
                            <h3 className='text-2xl sm:text-3xl text-[#D88E7D] stylefont'>{translations.contact.submit.short}</h3>
                            <h2 className='text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 headerstyle'>{translations.contact.submit.title2}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                <input
                                    type='text'
                                    name="name"
                                    placeholder='Name'
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='p-3 sm:p-4 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-[#D88E7D] text-base'
                                />
                                <input
                                    type='email'
                                    name="email"
                                    placeholder='Email'
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='p-3 sm:p-4 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-[#D88E7D] text-base'
                                />
                            </div>
                            <input
                                type='text'
                                name="subject"
                                placeholder='Subject'
                                required
                                value={formData.subject}
                                onChange={handleInputChange}
                                className='p-3 sm:p-4 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-[#D88E7D] text-base'
                            />
                            <textarea
                                name="message"
                                placeholder='Message'
                                required
                                rows="5"
                                value={formData.message}
                                onChange={handleInputChange}
                                className='p-3 sm:p-4 rounded-lg border w-full h-32 sm:h-40 focus:outline-none focus:ring-2 focus:ring-[#D88E7D] text-base resize-y'
                            ></textarea>
                            <button
                                type="submit"
                                disabled={submitStatus.submitting}
                                className='bg-[#D88E7D] text-white p-3 sm:p-4 rounded-lg hover:bg-[#c27c6d] transition-colors disabled:opacity-50 text-base font-medium min-w-[120px] flex items-center justify-center'
                            >
                                {submitStatus.submitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : translations.contact.submit.button}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact