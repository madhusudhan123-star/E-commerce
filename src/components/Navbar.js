import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import translations from '../utils/data';
import { useCart } from './CartContext';

const Navbar = () => {
    const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
    const [dropdownIndex, setDropdownIndex] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setDropdownIndex(index);
    };

    const handleMouseLeave = () => {
        setDropdownIndex(null);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className='w-full px-4 md:px-10 z-10 absolute top-0'>
            <div className='flex w-full flex-col overflow-hidden'>
                {/* Top contact info */}
                <div className='hidden md:flex justify-between'>
                    <div><h1 className='text-lg my-4'>Reach us: No: 58 A, East Madison Street, Baltimore, MD, USA 4508</h1></div>
                    <div><p className='text-lg my-4 hover:text-[#DA9687]'>Call Us: 000 - 123456789</p></div>
                </div>
                <div className='w-full h-[1px] bg-black hidden md:block'></div>

                {/* Main navbar */}
                <div className='flex justify-between items-center mt-4 md:mt-10'>
                    {/* Mobile menu button */}
                    <button
                        className='md:hidden text-2xl p-2'
                        onClick={toggleMobileMenu}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className='w-1/2'> <a href='/'><img className='w-[20%]' src={translations.home.logo} alt="logo" /> </a></div>


                    {/* Desktop menu */}
                    <div className='hidden md:flex text-black space-x-6 items-center relative z-20'>
                        {translations.home.links && translations.home.links.map((link, index) => (
                            <div
                                key={index}
                                className='relative group'
                            >
                                <a href={link.url} className='px-4 py-2 hover:text-[#DA9687] flex items-center text-sm font-medium transition-colors duration-200'>
                                    {link.title}
                                </a>
                            </div>
                        ))}
                        <button
                            onClick={toggleCart}
                            className='relative p-2 hover:text-[#DA9687] transition-colors duration-200'
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cart.length > 0 && (
                                <span className='absolute -top-1 -right-1 bg-[#DA9687] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center'>
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Cart Sidebar */}
                <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
                    <div className='p-6'>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-xl font-semibold'>Shopping Cart</h2>
                            <button
                                onClick={toggleCart}
                                className='text-xl hover:text-[#DA9687] transition-colors duration-200'
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        {cart.length === 0 ? (
                            <p className='text-center text-gray-500'>Your cart is empty</p>
                        ) : (
                            <div className='space-y-4'>
                                {cart.map((item) => (
                                    <div key={item.id} className='flex items-center justify-between border-b pb-4'>
                                        <div className='flex items-center space-x-4'>
                                            <img src={item.image} alt={item.name} className='w-16 h-16 object-cover' />
                                            <div>
                                                <h3 className='font-medium'>{item.name}</h3>
                                                <p className='text-[#DA9687]'>${item.price}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className='text-gray-500 hover:text-[#DA9687]'
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                ))}
                                <div className='pt-4'>
                                    <div className='flex justify-between mb-4'>
                                        <span>Total:</span>
                                        <span className='font-semibold'>
                                            ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <button className='w-full bg-[#DA9687] text-white py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200'>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-50`}>
                    <div className='p-6'>
                        <button
                            className='mb-6 text-xl hover:text-[#DA9687] transition-colors duration-200'
                            onClick={toggleMobileMenu}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className='space-y-1'>
                            {translations.home.links && translations.home.links.map((link, index) => (
                                <div key={index} className='py-1'>
                                    <a href={link.url}
                                        className='block px-4 py-2.5 hover:text-[#DA9687] text-sm font-medium transition-colors duration-200'
                                    >
                                        {link.title}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;