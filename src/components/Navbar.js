import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faTimes, 
  faBars
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

import { useCart } from './CartContext';

const Navbar = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleRemoveFromCart = (cartItemId) => {
    removeFromCart(cartItemId);

    // Update local storage using cartItemId
    const currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = currentCartItems.filter(item => item.cartItemId !== cartItemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    const cartItems = cart.map(item => ({
      name: item.name,
      quantity: 1,
      price: Number(item.cost),
      cost: Number(item.cost)
    }));

    const totalAmount = cartItems.reduce((total, item) =>
      total + (Number(item.price) || 0), 0
    );

    toggleCart();
    navigate('/billing', {
      state: {
        items: cartItems,
        totalAmount: totalAmount,
        quantity: cartItems.length,
        paymentMode: 'online'
      }
    });
  };

  const renderCartSidebar = () => (
    <div className={`fixed overflow-y-scroll top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
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
          <div className="text-center py-10">
            <FontAwesomeIcon icon={faShoppingCart} className="text-5xl text-gray-300 mb-4" />
            <p className='text-gray-500 mb-6'>Your cart is empty</p>
            <button
              onClick={toggleCart}
              className='px-6 py-2 bg-[#DA9687] text-white rounded-md hover:bg-opacity-90 transition-colors'
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            {cart.map((item) => (
              <div key={item.cartItemId} className='flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors'>
                <div className='flex items-center space-x-4'>
                  {item.photo && item.photo.image1 ? (
                    <img
                      src={item.photo.image1}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded-md'
                    />
                  ) : (
                    <div className='w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center'>
                      <span className='text-gray-500'>No image</span>
                    </div>
                  )}
                  <div>
                    <h3 className='font-medium'>{item.name}</h3>
                    <p className='text-[#DA9687]'>₹{Number(item.cost).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.cartItemId)}
                  className='text-gray-500 hover:text-red-500 transition-colors'
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
            <div className='pt-4'>
              <div className='flex justify-between mb-4'>
                <span className='font-medium'>Total:</span>
                <span className='font-semibold'>
                  {cart.reduce((total, item) => total + Number(item.cost), 0).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className='w-full bg-[#DA9687] text-white py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200'
              >
                Checkout
              </button>
              <button
                onClick={toggleCart}
                className='w-full border border-gray-300 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-50 transition-colors duration-200'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#ffc300] backdrop-blur-md shadow-sm py-3' 
            : 'bg-[#ffc300] py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with Brand Name */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src={logo} 
                alt="Brand Logo" 
                className="h-20 md:h-16 transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <Link to="/" className="nav-link font-medium text-gray-800 hover:text-[#DA9687] transition-all duration-300 relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#DA9687] after:transition-all hover:after:w-full">
                Home
              </Link>
              <Link to="/shop" className="nav-link font-medium text-gray-800 hover:text-[#DA9687] transition-all duration-300 relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#DA9687] after:transition-all hover:after:w-full">
                Shop
              </Link>
              <Link to="/about" className="nav-link font-medium text-gray-800 hover:text-[#DA9687] transition-all duration-300 relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#DA9687] after:transition-all hover:after:w-full">
                About
              </Link>
              <Link to="/contact" className="nav-link font-medium text-gray-800 hover:text-[#DA9687] transition-all duration-300 relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#DA9687] after:transition-all hover:after:w-full">
                Contact
              </Link>
            </nav>

            {/* Right Icons - Only Cart */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleCart} 
                className="relative p-2 group"
                aria-label="Cart"
              >
                <span className="absolute inset-0 rounded-full bg-[#DA9687]/10 scale-0 transition-transform group-hover:scale-100"></span>
                <FontAwesomeIcon 
                  icon={faShoppingCart} 
                  className="text-xl transition-all hover:text-[#DA9687]" 
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#DA9687] text-white rounded-full text-xs flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden relative p-2 group"
                aria-label="Menu"
              >
                <span className="absolute inset-0 rounded-full bg-[#DA9687]/10 scale-0 transition-transform group-hover:scale-100"></span>
                <FontAwesomeIcon 
                  icon={isMobileMenuOpen ? faTimes : faBars} 
                  className="text-xl transition-all hover:text-[#DA9687]" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMobileMenu}
      />
      
      {/* Mobile Menu - Simplified */}
      <div 
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-500 ease-in-out z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Brand Logo" className="h-8" />
            </div>
            <button 
              onClick={toggleMobileMenu}
              className="text-xl hover:text-[#DA9687] transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <nav className="space-y-6">
            <Link to="/" 
              className="block text-lg font-medium hover:text-[#DA9687] hover:translate-x-2 transition-all duration-300 py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link to="/shop" 
              className="block text-lg font-medium hover:text-[#DA9687] hover:translate-x-2 transition-all duration-300 py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Shop
            </Link>
            <Link to="/about" 
              className="block text-lg font-medium hover:text-[#DA9687] hover:translate-x-2 transition-all duration-300 py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link to="/contact" 
              className="block text-lg font-medium hover:text-[#DA9687] hover:translate-x-2 transition-all duration-300 py-2 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </nav>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Explore our premium collections</p>
            <button
              onClick={() => {
                toggleMobileMenu();
                navigate('/shop');
              }}
              className="bg-[#DA9687] text-white px-6 py-2 rounded-full hover:bg-[#c67c6b] transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar - Keep existing implementation */}
      {renderCartSidebar()}
      
      {/* Overlay for cart sidebar */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleCart}
      />

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className={isScrolled ? "h-16" : "h-24"} />
    </>
  );
};

export default Navbar;