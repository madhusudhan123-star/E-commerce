import React, { useState, useEffect, useRef } from 'react';
import '../App.css'
import product from '../assets/product.jpg';
import product1 from '../assets/six.jpg';  // Ensure these files exist
import product2 from '../assets/seven.jpg';  // Ensure these files exist
import product3 from '../assets/eight.jpg';  // Ensure these files exist
import product4 from '../assets/nine.jpg';  // Ensure these files exist
import product5 from '../assets/ten.jpg';  // Ensure these files exist
import product6 from '../assets/one.jpg';  // Ensure these files exist
import product7 from '../assets/two.jpg';  // Ensure these files exist
import product8 from '../assets/three.jpg';  // Ensure these files exist
import product9 from '../assets/four.jpg';  // Ensure these files exist
import product10 from '../assets/five.jpg';  // Ensure these files exist
import { useLanguage } from '../context/LanguageContext'; // Add this import
import data from '../assets/data'; // Add this import
import logo from '../assets/logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, Zoom, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

import related1 from '../assets/product.jpg'; // Using existing product images as placeholders
import related2 from '../assets/six.jpg';  
import related3 from '../assets/seven.jpg';  
import related4 from '../assets/eight.jpg';


// Custom CSS for Product Slider
const productSliderStyles = `
  .main-product-swiper {
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .main-product-swiper .swiper-slide {
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .main-product-swiper .swiper-button-next,
  .main-product-swiper .swiper-button-prev {
    color: #4169E1;
    background: rgba(255, 255, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .main-product-swiper .swiper-button-next:hover,
  .main-product-swiper .swiper-button-prev:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: scale(1.1);
  }
  
  .main-product-swiper .swiper-button-next:after,
  .main-product-swiper .swiper-button-prev:after {
    font-size: 18px;
  }
  
  .main-product-swiper .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: rgba(65, 105, 225, 0.5);
    transition: all 0.3s ease;
  }
  
  .main-product-swiper .swiper-pagination-bullet-active {
    background: #4169E1;
    width: 20px;
    border-radius: 5px;
  }
  
  /* Mobile Call Button Styles */
  .mobile-call-button {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #4169E1, #7e4fe9);
    border-radius: 50%;
    box-shadow: 0 6px 16px rgba(65, 105, 225, 0.4);
    z-index: 999;
    transition: all 0.3s ease;
    animation: pulse-ring 2s ease-out infinite;
  }
  
  .mobile-call-button svg {
    color: white;
    width: 28px;
    height: 28px;
  }
  
  .mobile-call-button:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(65, 105, 225, 0.6);
  }
  
  @keyframes pulse-ring {
    0% {
      box-shadow: 0 0 0 0 rgba(65, 105, 225, 0.7);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(65, 105, 225, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(65, 105, 225, 0);
    }
  }
  
  @media (max-width: 768px) {
    .mobile-call-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

// Insert the styles into the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = productSliderStyles;
  document.head.appendChild(styleElement);
}

const PAYMENT_IMAGES = {
  visa: "/assets/visa.svg",
  mastercard: "/assets/mastercard.svg",
  rupay: "/assets/rupay.svg",
  razorpay: "https://razorpay.com/assets/razorpay-glyph.svg",
  secure: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
  pci: "https://cdn-icons-png.flaticon.com/512/6107/6107137.png",
  ssl: "https://cdn-icons-png.flaticon.com/512/7947/7947657.png"
};

// Customer Reviews Data
const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "James Wilson",
    date: "August 15, 2024",
    rating: 5,
    content: "I couldn't be happier with my purchase! The Sree Anjaneya Shani Raksha bracelet is beautifully crafted and I can already feel its positive energy. The shipping was fast and the packaging was very secure.",
    verified: true,
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    date: "July 29, 2024",
    rating: 5,
    content: "This is exactly what I was looking for! The quality is exceptional and it looks even better in person than in the photos. I've received many compliments already. Highly recommended!",
    verified: true,
    location: "Delhi"
  },
  {
    id: 3,
    name: "Rahul Sharma",
    date: "July 12, 2024",
    rating: 4,
    content: "The product arrived on time and was packaged very well. The craftsmanship is excellent and the energy is wonderful. I'm giving 4 stars only because I wish it came with more information about its spiritual properties.",
    verified: true,
    location: "Bangalore"
  },
  {
    id: 4,
    name: "Priya Patel",
    date: "June 28, 2024",
    rating: 5,
    content: "I bought this as a gift for my father and he absolutely loves it! The quality is superior and the design is very elegant. Customer service was excellent when I had questions about the shipping.",
    verified: true,
    location: "Chennai"
  },
  {
    id: 5,
    name: "Michael Thompson",
    date: "May 17, 2024",
    rating: 5,
    content: "Simply amazing! I've been wearing this for two weeks now and have noticed positive changes in my life. Very satisfied with my purchase and will definitely buy more products from this store.",
    verified: true,
    location: "Hyderabad"
  }
];

const COUNTRY_CURRENCY_MAP = {
  'India': { currency: 'INR', symbol: '₹', rate: 1 },
  'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
  'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0097 },
  'European Union': { currency: 'EUR', symbol: '€', rate: 0.011 },
  'Canada': { currency: 'CAD', symbol: 'CA$', rate: 0.016 },
  'Australia': { currency: 'AUD', symbol: 'A$', rate: 0.018 },
  'Japan': { currency: 'JPY', symbol: '¥', rate: 1.67 },
  'China': { currency: 'CNY', symbol: '¥', rate: 0.088 },
  'Singapore': { currency: 'SGD', symbol: 'S$', rate: 0.016 },
  'United Arab Emirates': { currency: 'AED', symbol: 'د.إ', rate: 0.044 },
  'Switzerland': { currency: 'CHF', symbol: 'CHF', rate: 0.011 },
  'Russia': { currency: 'RUB', symbol: '₽', rate: 0.96 },
  'South Korea': { currency: 'KRW', symbol: '₩', rate: 15.68 },
  'Brazil': { currency: 'BRL', symbol: 'R$', rate: 0.059 },
  'South Africa': { currency: 'ZAR', symbol: 'R', rate: 0.22 }
};

const url = "http://localhost:5000";

const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";

const PaymentModeSelector = ({ selectedMode, onChange, translations }) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-700">
      {translations?.checkout?.mode || 'Payment Mode'}<span className="text-red-500">*</span>
    </label>
    <div className="space-y-3">
      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
        <input
          type="radio"
          name="paymentMode"
          value="online"
          checked={selectedMode === 'online'}
          onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
          className="h-5 w-5 text-blue-600"
        />
        <div className="ml-4">
          <span className="font-medium text-gray-900">Pay Securely Online</span>
          <p className="text-sm text-green-600">Get 10% instant discount</p>
        </div>
      </label>

      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-200">
        <input
          type="radio"
          name="paymentMode"
          value="cod"
          checked={selectedMode === 'cod'}
          onChange={(e) => onChange({ target: { name: 'paymentMode', value: e.target.value } })}
          className="h-5 w-5 text-blue-600"
        />
        <div className="ml-4">
          <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
          <p className="text-sm text-gray-500">Pay when you receive</p>
        </div>
      </label>
    </div>
  </div>
);

const Landing = () => {
  const { language } = useLanguage(); // Get language from context
  const translations = data[language] || data['ENGLISH']; // Use ENGLISH as fallback
  const [orderDetails, setOrderDetails] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [orderNumber, setOrderNumber] = useState(1); // Initial order number
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const productPrice = 999; // Discounted price per unit
  const originalPrice = 6990; // Original price per unit
  const productImages = [product, product1, product2, product3, product4, product5];
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  useEffect(() => {
    // Simulate fetching the latest order number from the backend
    const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
    setOrderNumber(parseInt(latestOrderNumber, 10));
  }, []);

  const incrementOrderNumber = () => {
    const nextOrderNumber = orderNumber + 1;
    setOrderNumber(nextOrderNumber);
    localStorage.setItem("orderNumber", nextOrderNumber); // Persist order number locally
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: DEFAULT_COUNTRY,
    streetAddress: '',
    apartment: '',
    townCity: '',
    phone: '',
    email: '',
    paymentMode: ''
  });

  // Update currency and convert amount when country changes
  useEffect(() => {
    if (orderDetails) {
      const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
      setCurrentCurrency(foundCurrency);

      // Convert amount from INR to selected currency
      const baseAmount = orderDetails.totalAmount; // Total amount in INR
      const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
      setConvertedAmount(convertedValue);
    }
  }, [formData.country, orderDetails]);
  
  // Original useEffects for initialization and script loading...
  useEffect(() => {
    // Initialize orderDetails with default values
    setOrderDetails({
      quantity: quantity,
      totalAmount: quantity * productPrice,
      productName: 'Sree Anjaneya Shani Raksha',
      unitPrice: productPrice
    });

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [quantity]); // Add quantity as dependency

  // Update orderDetails whenever quantity changes
  useEffect(() => {
    setOrderDetails(prev => ({
      ...prev,
      quantity: quantity,
      totalAmount: quantity * productPrice
    }));
  }, [quantity]);
  
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.firstName.trim()) errors.firstName = translations?.checkout?.formFields?.firstName?.error || 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = translations?.checkout?.formFields?.lastName?.error || 'Last name is required';
    if (!formData.country.trim()) errors.country = translations?.checkout?.formFields?.country?.error || 'Country is required';
    if (!formData.streetAddress.trim()) errors.streetAddress = translations?.checkout?.formFields?.address?.error || 'Street address is required';
    if (!formData.townCity.trim()) errors.townCity = translations?.checkout?.formFields?.city?.error || 'Town/City is required';
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      errors.phone = translations?.checkout?.formFields?.phone?.error || 'Please enter a valid 10-digit phone number';
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = translations?.checkout?.formFields?.email?.error || 'Please enter a valid email';
    }
    if (!formData.paymentMode) errors.paymentMode = 'Please select a payment mode';

    return errors;
  };
  
  useEffect(() => {
    if (orderDetails) {
      const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
      setCurrentCurrency(foundCurrency);

      let baseAmount = orderDetails.totalAmount; // Total amount in INR
      let discountPercentage = 10;

      // Apply 10% discount for online payment
      if (formData.paymentMode === 'online') {
        baseAmount *= (1 - discountPercentage / 100);
      }

      const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
      setConvertedAmount(convertedValue);
    }
  }, [formData.country, orderDetails, formData.paymentMode]);
  
  const handlePromoCodeApply = () => {
    if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
      setIsPromoApplied(true);
      setFormErrors(prev => ({ ...prev, promoCode: "" }));
    } else {
      setIsPromoApplied(false);
      setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsProcessingOrder(true);
      setIsSubmitting(true);

      try {
        if (formData.paymentMode === 'online') {
          handleRazorpayPayment();
        } else if (formData.paymentMode === 'cod') {
          const formattedData = {
            _subject: `New Order #${orderNumber} - Cash on Delivery`,
            _template: "table",
            _captcha: "false",
            orderNumber: orderNumber,
            orderDate: new Date().toISOString(),
            customerName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
            productName: orderDetails.productName,
            quantity: orderDetails.quantity,
            amount: `${currentCurrency.symbol} ${convertedAmount}`,
            paymentMethod: "Cash on Delivery",
            orderStatus: "Pending"
          };

          try {
            const response = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(formattedData)
            });

            const result = await response.json();
            console.log('Order submission result:', result);

            if (result.success) {
              incrementOrderNumber();
              setPaymentSuccess(true);
            } else {
              throw new Error('Order submission failed');
            }
          } catch (error) {
            throw new Error(`Failed to process order: ${error.message}`);
          }
        }
      } catch (error) {
        console.error('Order processing error:', error);
        setFormErrors(prev => ({
          ...prev,
          submit: error.message || 'Failed to process order. Please try again.'
        }));
      } finally {
        setIsProcessingOrder(false);
        setIsSubmitting(false);
      }
    }
  };
  
  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      setFormErrors(prev => ({
        ...prev,
        submit: "Payment gateway not loaded. Please refresh the page."
      }));
      return;
    }

    try {
      // Step 1: Create an order through backend API first
      const orderResponse = await fetch(`${url}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: convertedAmount, // The amount to charge
          currency: currentCurrency.currency, // Currency code (INR, USD, etc)
          receipt: `receipt_${orderNumber}`, // A unique receipt ID
          notes: {
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            productName: orderDetails.productName,
            quantity: orderDetails.quantity
          }
        })
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create payment order");
      }

      // Step 2: Initialize Razorpay with order details from backend
      const options = {
        key: orderData.key, // Key ID from backend for extra security
        amount: orderData.order.amount, // Amount in smallest currency unit
        currency: orderData.order.currency,
        name: 'Sree Anjaneya',
        description: `Order for ${orderDetails.productName}`,
        order_id: orderData.order.id, // Order ID obtained from backend
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        handler: async function (response) {
          try {
            // Step 3: Verify payment through backend
            const verifyResponse = await fetch(`${url}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();
            
            if (!verifyData.success) {
              throw new Error("Payment verification failed. Please contact support.");
            }

            // Payment verified successfully, now send order details
            const formattedData = {
              _subject: `New Order #${orderNumber} - Online Payment`,
              _template: "table",
              _captcha: "false",
              orderNumber: orderNumber,
              orderDate: new Date().toISOString(),
              customerName: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
              productName: orderDetails.productName,
              quantity: orderDetails.quantity,
              amount: `${currentCurrency.symbol} ${convertedAmount}`,
              paymentMethod: "Online Payment (Razorpay)",
              paymentId: response.razorpay_payment_id,
              orderStatus: "Paid"
            };

            const formResponse = await fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(formattedData)
            });

            if (!formResponse.ok) {
              throw new Error(`HTTP error! status: ${formResponse.status}`);
            }

            const result = await formResponse.json();
            console.log('Payment form submission result:', result);

            if (result.success) {
              incrementOrderNumber();
              setPaymentSuccess(true);
            } else {
              throw new Error("Failed to submit order details");
            }
          } catch (error) {
            console.error("Order submission error:", error);
            setFormErrors(prev => ({
              ...prev,
              submit: "Payment successful but failed to send order details. Please contact support."
            }));
          } finally {
            setIsSubmitting(false);
            setIsProcessingOrder(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            setIsProcessingOrder(false);
          },
          escape: false,
          backdropclose: false
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay payment error:", error);
      setFormErrors(prev => ({
        ...prev,
        submit: error.message || "Failed to initialize payment. Please try again."
      }));
      setIsSubmitting(false);
      setIsProcessingOrder(false);
    }
  };
  
  const renderFormField = (name, label, type = "text", required = true) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 rounded-lg border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );
  
  const renderOrderSummary = () => (
    <div className="space-y-6">
      {/* Product Details Card */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{translations?.checkout?.product || 'Product'}</span>
          <span className="text-gray-600">{translations?.checkout?.subtotal || 'Subtotal'}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{orderDetails?.productName}</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              x{orderDetails?.quantity}
            </span>
          </div>
          <div className="text-right">
            <span className="line-through text-gray-400 text-sm">
              {currentCurrency.symbol} {(originalPrice * orderDetails.quantity * currentCurrency.rate).toFixed(2)}
            </span>
            <span className="block font-medium text-gray-900">
              {currentCurrency.symbol} {convertedAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="flex justify-between items-center py-3 border-t border-gray-200">
        <span className="font-medium text-gray-700">{translations?.checkout?.shipping || 'Shipping'}</span>
        <div className="text-right">
          <span className="text-green-600 font-medium">Free</span>
          <span className="block text-sm text-gray-500">Delivery within 5-7 business days</span>
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex justify-between items-center py-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-800">{translations?.checkout?.total || 'Total'}</span>
        <span className="text-lg font-bold text-blue-600">
          {currentCurrency.symbol} {convertedAmount}
        </span>
      </div>

      {/* Payment Mode Selection */}
      <div className="mt-6">
        <PaymentModeSelector
          selectedMode={formData.paymentMode}
          onChange={handleInputChange}
          translations={translations}
        />
        {formErrors.paymentMode && (
          <p className="text-red-500 text-sm mt-2">{formErrors.paymentMode}</p>
        )}
      </div>

      {/* Discount Banner */}
      <div className="mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-xl transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">🎉</span>
          <p className="text-center font-medium">
            Enjoy a 10% discount when you prepay online! ✨
          </p>
        </div>
      </div>

      {/* Submit Button with Enhanced Styling */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-4 px-6 rounded-xl
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {translations?.checkout?.processing || 'Processing'}
          </div>
        ) : (
          translations?.checkout?.order || 'Place Order'
        )}
      </button>

      {/* Payment Partners Section remains unchanged */}
      {/* ...existing payment partners code... */}
    </div>
  );
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
        <div className="max-w-2xl w-full mx-auto px-4 transform animate-fadeIn">
          <div className="bg-green-50 rounded-2xl p-8 border border-green-200 shadow-xl">
            <div className="w-16 h-16 mx-auto mb-6">
              <svg className="w-full h-full text-green-500 animate-checkmark" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M20,6L9,17l-5-5"
                  className="animate-draw"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4 animate-slideUp">
              {translations?.checkout?.successfully || 'Order Successful!'}
            </h2>
            <p className="text-gray-600 mb-2 animate-slideUp delay-100">
              {`${translations?.checkout?.orderNumber || 'Order Number'}: ${orderNumber}`}
            </p>
            <p className="text-gray-600 mb-6 animate-slideUp delay-200">
              {translations?.checkout?.thank || 'Thank you for your purchase!'}
            </p>
            <button
              // onClick={() => navigate('/')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 
                                     transition-all duration-300 transform hover:scale-105 animate-slideUp delay-300"
            >
              {translations?.checkout?.continue || 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const LoadingOverlay = () => (
    isProcessingOrder && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Processing your order...</p>
        </div>
      </div>
    )
  );
  return (
    <div className="">
      <LoadingOverlay />
      <MobileCallButton />
      {/* Hero Section with Enhanced Design */}
      <div className="text-black py-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={logo} alt="Logo" className="h-24 pl-5"/>
          <h1 className="text-center text-4xl md:text-6xl font-bold">
            Sree Anjaneya Shani Raksha Kavach
          </h1>
          {/* YouTube Subscribe Button */}
          <a 
            href="https://www.youtube.com/channel/UCvVPuK65Uhb_ts8qT4t0CWQ?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-5 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none"
            aria-label="Subscribe to our YouTube channel"
          >
            
            {/* YouTube Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            
            <span className="flex items-center gap-1">
              <span className="font-semibold">subscription </span>
            </span>
            
          </a>
        </div>
        <div className="mb-8 mt-5 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full text-blue-600 animate-bounce">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-lg">Special Limited Offer!</p>
                <p className="text-sm text-blue-100">Enjoy divine protection with our blessed Shani Raksha Kavach</p>
              </div>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-lg">
                Save ₹{originalPrice - productPrice}
              </div>
            </div>
          </div>
        </div>
      </div>      
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Special Offer Banner */}
        
        {/* Product Selection Section with Glass Morphism */}
        <div className='flex flex-col md:flex-row items-start gap-8 mb-12'>
          <div className="w-full bg-gradient-to-br from-white via-white to-blue-50 bg-opacity-70 backdrop-blur-lg p-6 border border-white border-opacity-20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="mb-8 w-full">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Images Section - Fixed sizing */}                <div className="md:w-1/2 space-y-6">
                  {/* Main Product Slider */}
                  <div className="product-slider rounded-lg overflow-hidden shadow-xl">
                    <Swiper
                      modules={[Navigation, Pagination, Thumbs, Zoom, Autoplay]}
                      spaceBetween={0}
                      navigation={true}
                      pagination={{ 
                        clickable: true,
                        dynamicBullets: true
                      }}
                      thumbs={{ swiper: thumbsSwiper }}
                      zoom={true}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                      }}
                      loop={true}
                      className="main-product-swiper rounded-lg"
                    >
                      {productImages.map((img, index) => (
                        <SwiperSlide key={index} className="bg-white">
                          <div className="swiper-zoom-container">
                            <img
                              src={img}
                              alt={`Sree Anjaneya Shani Raksha Kavach view ${index + 1}`}
                              className="w-full h-[400px] object-contain"
                            />
                          </div>
                          {/* Image Badges */}
                          {index === 0 && (
                            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium transform rotate-[-5deg] shadow-lg animate-pulse">
                              Bestseller
                            </div>
                          )}
                          <div className="absolute bottom-4 right-4 z-10 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                            Tap to zoom
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  
                  {/* Thumbnails Slider */}
                  <div className="thumbnails-slider px-2">
                    <Swiper
                      modules={[Thumbs, FreeMode]}
                      watchSlidesProgress
                      spaceBetween={8}
                      slidesPerView={4}
                      freeMode={true}
                      onSwiper={setThumbsSwiper}
                      className="thumbs-swiper"
                    >
                      {productImages.map((img, index) => (
                        <SwiperSlide key={index} className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                          <div className="border-2 rounded-md overflow-hidden h-16">
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>                  {/* Image Feature Pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      High Quality
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 18.5l-8-4V8.5l8 4 8-4v8l-8 4z"/>
                      </svg>
                      Handcrafted
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      Blessed
                    </span>
                  </div>
                  
                  {/* Image Slider Instructions */}
                  <div className="bg-blue-50 p-3 rounded-lg text-center text-sm text-blue-700">
                    <div className="flex justify-center gap-3 mb-1 text-xs text-blue-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Tap to zoom
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                        </svg>
                        Swipe to browse
                      </div>
                    </div>
                    See all details of this divine protection amulet
                  </div>
                </div>                <div className="flex flex-col justify-between md:w-1/2 space-y-6">
                  {/* Product Title and Description */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 w-[80%]">
                          Sree Anjaneya Shani Raksha Kavach
                        </h1>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> In Stock
                        </div>
                      </div>                        {/* Rating Stars */}                      
                      <div className="flex items-center mb-3">
                        {Array(5).fill().map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">(152 reviews)</span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <span className="line-through text-lg text-red-500">₹{originalPrice}</span>
                        <span className="text-2xl text-green-600 font-bold">₹{productPrice}</span>
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-md font-medium">
                          {Math.round((originalPrice - productPrice) / originalPrice * 100)}% OFF
                        </span>
                      </div>                    
                      {/* Quantity and Delivery Information */}
                      <div className="mt-6 space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                              {translations?.productpage?.secondtitle || 'Quantity'}
                            </label>
                            <span className="text-xs text-blue-600 font-medium">
                              {quantity > 10 ? 'Bulk discount available!' : 'Buy more, save more!'}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-4 py-3 text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 text-xl font-medium focus:outline-none"
                                aria-label="Decrease quantity"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              
                              <div className="relative">
                                <input
                                  type="number"
                                  id="quantity"
                                  min="1"
                                  value={quantity}
                                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-16 px-3 py-3 text-center text-gray-700 font-medium border-x border-gray-200 focus:outline-none appearance-none"
                                />
                                <label htmlFor="quantity" className="sr-only">Quantity</label>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="px-4 py-3 text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 text-xl font-medium focus:outline-none"
                                aria-label="Increase quantity"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            
                            {quantity > 1 && (
                              <div className="text-sm bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full animate-fade-in flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {quantity} items selected
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Delivery Information */}
                        <div className="flex gap-3 mt-4">
                          <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-white">
                            <div className="flex items-center text-green-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-medium">Free Delivery</span>
                            </div>
                            <p className="text-xs text-gray-500">Estimated delivery within 5-7 business days</p>
                          </div>
                          <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-white">
                            <div className="flex items-center text-blue-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              <span className="font-medium">Easy Returns</span>
                            </div>
                            <p className="text-xs text-gray-500">30-day hassle-free return policy</p>
                          </div>
                        </div>
                      </div></div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100 mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="block text-lg font-semibold text-blue-700 mb-2">Divine Protection for Modern Life</span>
                        Sree Anjaneya Shani Raksha Kavach - An amulet manifesting both Hanuman and Shani Dev, engraved with divine and positive energy, acts as a protective shield for you and your family, drawing away the negative forces to secure you all along your way. The divine articles of ring, mace, and locket protect you from head to toe, unleashing your positive aura and relishing the boons upon your life. And they destroy every curse hung upon you for ages.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Sacred Benefits:</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Handcrafted with sacred materials</span>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Blessed with ancient Vedic mantras</span>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Protection from negative energies</span>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Minimizes effects of Shani Dasha</span>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">Perfect for spiritual protection</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-100 flex items-center">
                        <div className="mr-3 bg-amber-100 p-1 rounded-full text-amber-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm11 4H4v2h12V6zm-2 3H6v2h8V9zm-2 3H8v2h4v-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-amber-700">FREE BONUS:</span> 
                          <span className="text-gray-700"> Ring encapsulated with the energy of Hanuman Chalisa protects you from every vulnerability</span>
                        </div>
                      </div>
                    </div>                  </div>
                </div>

              </div>
              
              {/* Guarantee and Trust Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  {/* Authenticity Badge */}
                  <div className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-blue-800">100% Authentic</h3>
                    <p className="text-sm text-blue-600 mt-1">Certified sacred item with blessing</p>
                  </div>
                  
                  {/* Satisfaction Badge */}
                  <div className="flex-1 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-green-800">Satisfaction Guaranteed</h3>
                    <p className="text-sm text-green-600 mt-1">Experience divine blessings or full refund</p>
                  </div>
                  
                  {/* Support Badge */}
                  <div className="flex-1 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-purple-800">Expert Guidance</h3>
                    <p className="text-sm text-purple-600 mt-1">24/7 spiritual consultation support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Checkout Grid with Enhanced Styling */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Billing Details Section */}
          <div className="space-y-8">
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white border-opacity-20 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                {translations?.checkout?.sectitle || 'Shipping Information'}
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {renderFormField("firstName", translations?.checkout?.firstname || 'First Name')}
                  {renderFormField("lastName", translations?.checkout?.lastname || 'Last Name')}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {translations?.checkout?.country || 'Country'}<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                      <option key={country} value={country}>
                        {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                      </option>
                    ))}
                  </select>
                </div>

                {renderFormField("streetAddress", translations?.checkout?.address || 'Street Address')}
                {renderFormField("apartment", translations?.checkout?.clientaddress || 'Apartment, suite, etc. (optional)', "text", false)}
                {renderFormField("townCity", translations?.checkout?.city || 'Town/City')}
                {renderFormField("phone", translations?.checkout?.phone || 'Phone', "tel")}
                {renderFormField("email", translations?.checkout?.email || 'Email', "email")}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div>
            <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white border-opacity-20 sticky top-4 transition-all duration-300 hover:shadow-2xl">
              {renderOrderSummary()}
            </div>
          </div>
        </div>        {/* Customer Reviews Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Customer Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their experience with Sree Anjaneya Shani Raksha
            </p>
          </div>
          
          <Swiper
            className="reviews-swiper"
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {[
              {
                id: 1,
                name: "James Wilson",
                date: "August 15, 2024",
                rating: 5,
                content: "I couldn't be happier with my purchase! The Sree Anjaneya Shani Raksha bracelet is beautifully crafted and I can already feel its positive energy. The shipping was fast and the packaging was very secure.",
                verified: true,
                location: "Mumbai"
              },
              {
                id: 2,
                name: "Sarah Johnson",
                date: "July 29, 2024",
                rating: 5,
                content: "This is exactly what I was looking for! The quality is exceptional and it looks even better in person than in the photos. I've received many compliments already. Highly recommended!",
                verified: true,
                location: "Delhi"
              },
              {
                id: 3,
                name: "Rahul Sharma",
                date: "July 12, 2024",
                rating: 4,
                content: "The product arrived on time and was packaged very well. The craftsmanship is excellent and the energy is wonderful. I'm giving 4 stars only because I wish it came with more information about its spiritual properties.",
                verified: true,
                location: "Bangalore"
              },
              {
                id: 4,
                name: "Priya Patel",
                date: "June 28, 2024",
                rating: 5,
                content: "I bought this as a gift for my father and he absolutely loves it! The quality is superior and the design is very elegant. Customer service was excellent when I had questions about the shipping.",
                verified: true,
                location: "Chennai"
              },
              {
                id: 5,
                name: "Michael Thompson",
                date: "May 17, 2024",
                rating: 5,
                content: "Simply amazing! I've been wearing this for two weeks now and have noticed positive changes in my life. Very satisfied with my purchase and will definitely buy more products from this store.",
                verified: true,
                location: "Hyderabad"
              }
            ].map((review) => (
              <SwiperSlide key={review.id}>
                <div className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div className="review-info">
                      <div className="review-name">{review.name}</div>
                      <div className="review-date">{review.date} • {review.location}</div>
                    </div>
                  </div>
                  
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">
                        {i < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  
                  <p className="review-content">
                    "{review.content}"
                  </p>
                  
                  <div className="review-footer">
                    <div className="verified-badge">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified Purchase
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="text-center mt-10">
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              View All Reviews
              <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Trust Badges Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-gray-600">256-bit SSL encryption</p>
            </div>
            <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Within 5-7 business days</p>
            </div>
            <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold">Multiple Payment Options</h3>
              <p className="text-sm text-gray-600">Credit/Debit Cards, UPI, Net Banking</p>
            </div>
            <div className="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold">24/7 Customer Support</h3>
              <p className="text-sm text-gray-600">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Call Button Component
const MobileCallButton = () => {
  // Phone number to call
  const phoneNumber = "+919988776655"; // Replace with your actual customer support number
  
  return (
    <a
      href={`tel:${phoneNumber}`}
      className="mobile-call-button"
      aria-label="Call customer support"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
      </svg>
    </a>
  );
};

export default Landing;