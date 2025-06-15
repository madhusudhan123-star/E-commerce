import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import product from '../assets/product.jpg';
import product1 from '../assets/six.jpg';
import product2 from '../assets/seven.jpg';
import product3 from '../assets/eight.jpg';
import product4 from '../assets/nine.jpg';
import product5 from '../assets/ten.jpg';
import { useLanguage } from '../context/LanguageContext';
import data from '../assets/data';
import logo from '../assets/logo.png';
import ringSound from '../assets/phone-ring.mp3'; // Add import for ring sound
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, Zoom, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
// Import functions and components from payment.js
import { productSliderStyles, CUSTOMER_REVIEWS, COUNTRY_CURRENCY_MAP, PaymentModeSelector, MobileCallButton, validateForm, handleSubmit as paymentHandleSubmit, handleRazorpayPayment as paymentHandleRazorpayPayment } from '../utils/payment';

// Insert the styles into the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = productSliderStyles;
  document.head.appendChild(styleElement);
}

// Backend URL
const url = "https://razorpaybackend-wgbh.onrender.com";

// Add automatic dialing function
const initiateAutomaticCall = () => {
  // Check if we've already tried to call in this session
  if (sessionStorage.getItem('autoCallAttempted') !== 'true') {
    // Mark that we've attempted a call this session
    sessionStorage.setItem('autoCallAttempted', 'true');
    
    // Create the call link element
    const callLink = document.createElement('a');
    callLink.href = 'tel:+919908030444';
    callLink.id = 'automatic-call-link';
    callLink.style.display = 'none';
    document.body.appendChild(callLink);
    
    // Short delay before initiating call
    setTimeout(() => {
      callLink.click();
      // Clean up the element
      document.body.removeChild(callLink);
    }, 1500);
    
    return true;
  }
  return false;
};

// New utility functions for email and payment operations
const sendOrderConfirmationEmail = async (customerEmail, orderDetails, customerDetails) => {
  try {
    const response = await fetch(`${url}/send-order-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail,
        orderDetails,
        customerDetails
      })
    });
    
    const result = await response.json();
    console.log("Order confirmation email result:", result);
    return result;
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return { success: false, error: error.message };
  }
};

const sendAbandonedOrderEmail = async (customerEmail, orderDetails, customerDetails) => {
  try {
    const response = await fetch(`${url}/send-abandoned-order-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail,
        orderDetails,
        customerDetails
      })
    });
    
    const result = await response.json();
    console.log("Abandoned order email result:", result);
    return result;
  } catch (error) {
    console.error("Failed to send abandoned order email:", error);
    return { success: false, error: error.message };
  }
};

const createRazorpayOrder = async (amount, currency, orderNumber, customerDetails) => {
  try {
    const response = await fetch(`${url}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: `receipt_${orderNumber}`,
        notes: {
          customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
          customerEmail: customerDetails.email,
          customerPhone: customerDetails.phone
        }
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    throw new Error("Payment initialization failed. Please try again.");
  }
};

const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await fetch(`${url}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });
    
    return await response.json();
  } catch (error) {
    console.error("Payment verification failed:", error);
    throw new Error("Payment verification failed. Please contact support.");
  }
};

const DEFAULT_COUNTRY = 'India';
// Add a safety check to ensure COUNTRY_CURRENCY_MAP is defined
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP && COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY] ? COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY] : { currency: 'INR', symbol: '₹', rate: 1 };
const VALID_PROMO_CODE = "FLASH70";

const Landing = () => {
  const navigate = useNavigate();
  const shippingInfoRef = useRef(null);
  const { language } = useLanguage();
  const translations = data[language] || data['ENGLISH']; 
  
  // Add state for tracking automatic call
  const [autoCallTriggered, setAutoCallTriggered] = useState(false);
  const [showCallNotification, setShowCallNotification] = useState(false);
  
  const scrollToShippingInfo = () => {
    shippingInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [orderDetails, setOrderDetails] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY || { currency: 'INR', symbol: '₹', rate: 1 });
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [orderNumber, setOrderNumber] = useState(1); // Initial order number
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const productPrice = 3990; // Discounted price per unit
  const originalPrice = 6990; // Original price per unit
  const productImages = [product, product1, product2, product3, product4, product5];
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const audioRef = useRef(null);
  const [isRinging, setIsRinging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [manualPlayAttempted, setManualPlayAttempted] = useState(false);

  // Add effect for automatic call dialing - MOVED HERE to follow React Hook rules
  useEffect(() => {
    // Attempt auto-dialing only if not already done
    const attemptedCall = initiateAutomaticCall();
    if (attemptedCall) {
      setAutoCallTriggered(true);
      setShowCallNotification(true);
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowCallNotification(false);
      }, 5000);
    }
  }, []); // Empty dependency array means this runs once on mount
  
  // Stop ringing when user interacts with the call button
  const handleCallClick = () => {
    setIsRinging(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // Update session storage to prevent duplicate auto calls
    sessionStorage.setItem('autoCallAttempted', 'true');
  };

  // Function to manually attempt playing sound - called by user interaction
  const attemptPlaySound = () => {
    setManualPlayAttempted(true);
    if (audioRef.current && soundLoaded) {
      audioRef.current.play().then(() => {
        console.log("Sound playing successfully");
      }).catch(error => {
        console.log("Manual play attempt failed:", error);
      });
    }
  };

  // Setup the ringing effect after page load with enhanced cross-device support
  useEffect(() => {
    // Mark sound as loaded when audio is ready
    const handleCanPlayThrough = () => {
      console.log("Audio loaded and ready to play");
      setSoundLoaded(true);
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // iOS Safari specific initialization
      audioRef.current.load(); // Explicitly load for iOS
    }
    
    const timer = setTimeout(() => {
      setIsRinging(true);
      
      // Try to play sound if it's loaded
      if (audioRef.current && soundLoaded) {
        tryPlayAudio();
      }
    }, 100);

    // Handle user interaction to enable audio
    const handleInteraction = () => {
      setHasInteracted(true);
      
      // Try to play sound on interaction if we're ringing
      if (isRinging && audioRef.current && soundLoaded) {
        tryPlayAudio();
      }
    };

    // Detect if device is mobile
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Try various techniques to play audio across different browsers and devices
    function tryPlayAudio() {
      // For iOS devices, we need to use a user gesture to play audio
      if (isMobileDevice() && !hasInteracted) {
        console.log("Mobile device detected, waiting for interaction");
        return;
      }

      // Create a user gesture context for iOS
      const context = new (window.AudioContext || window.webkitAudioContext)();
      context.resume().then(() => {
        console.log("AudioContext resumed successfully");
      });
      
      // Try to play with proper error handling
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Audio playing successfully");
        }).catch(error => {
          console.log('Audio playback error:', error);
          
          // Fall back to muted playback and then unmute (works on some mobile browsers)
          if (!manualPlayAttempted) {
            audioRef.current.muted = true;
            audioRef.current.play().then(() => {
              setTimeout(() => {
                audioRef.current.muted = false;
              }, 1000);
            }).catch(err => {
              console.log("Even muted playback failed:", err);
            });
          }
        });
      }
    }

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
    };
  }, [hasInteracted, isRinging, soundLoaded, manualPlayAttempted]);

  // Fetch initial order number
  useEffect(() => {
    const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
    setOrderNumber(parseInt(latestOrderNumber, 10));
  }, []);

  // Increment order number and save to localStorage
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

  // Update currency when country changes
  useEffect(() => {
    if (orderDetails) {
      const foundCurrency = (COUNTRY_CURRENCY_MAP && formData.country && COUNTRY_CURRENCY_MAP[formData.country]) 
        ? COUNTRY_CURRENCY_MAP[formData.country] 
        : DEFAULT_CURRENCY;
        
      setCurrentCurrency(foundCurrency);

      // Convert amount from INR to selected currency
      const baseAmount = orderDetails.totalAmount; // Total amount in INR
      const convertedValue = (baseAmount * (foundCurrency?.rate || 1)).toFixed(2);
      setConvertedAmount(convertedValue);
    }
  }, [formData.country, orderDetails]);
  
  // Initialize order details and load Razorpay script
  useEffect(() => {
    setOrderDetails({
      quantity: quantity,
      totalAmount: quantity * productPrice,
      productName: 'Sree Anjaneya Shani Raksha',
      unitPrice: productPrice
    });

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [quantity]); // Add quantity as dependency

  // Update order details when quantity changes
  useEffect(() => {
    setOrderDetails(prev => ({
      ...prev,
      quantity: quantity,
      totalAmount: quantity * productPrice
    }));
  }, [quantity]);
  
  // Apply discount for online payment
  useEffect(() => {
    if (orderDetails) {
      const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
      setCurrentCurrency(foundCurrency);      let baseAmount = orderDetails.totalAmount; // Total amount in INR
      let discountPercentage = 15;

      // Apply 15% discount for online payment
      if (formData.paymentMode === 'online') {
        baseAmount *= (1 - discountPercentage / 100);
      }

      const convertedValue = (baseAmount * foundCurrency.rate).toFixed(2);
      setConvertedAmount(convertedValue);
    }
  }, [formData.country, orderDetails, formData.paymentMode]);

  // Enhanced handleRazorpayPayment function using direct API calls
  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      setFormErrors(prev => ({
        ...prev,
        submit: "Payment gateway not loaded. Please refresh the page."
      }));
      setIsSubmitting(false);
      setIsProcessingOrder(false);
      return;
    }

    try {
      console.log("Initializing Razorpay payment...");
      
      // Create order directly via our utility function
      const orderData = await createRazorpayOrder(
        convertedAmount, 
        currentCurrency.currency, 
        orderNumber, 
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        }
      );
      
      console.log("Order created:", orderData);
      
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create payment order");
      }

      // Initialize Razorpay with order details
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Sree Anjaneya',
        description: `Order for ${orderDetails.productName}`,
        order_id: orderData.order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        handler: async function (response) {
          console.log("Payment successful, verifying...");
          try {
            // Verify payment through our utility function
            const verifyData = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            if (!verifyData.success) {
              throw new Error("Payment verification failed. Please contact support.");
            }
            
            console.log("Payment verified, submitting order details...");
            
            // Order details for email and thank you page
            const orderData = {
              orderNumber: orderNumber,
              orderDate: new Date().toISOString(),
              customerName: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              shippingAddress: `${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}, ${formData.country}`,
              productName: orderDetails.productName,
              quantity: orderDetails.quantity,
              totalAmount: convertedAmount,
              currency: currentCurrency.symbol,
              paymentMethod: "Online Payment (Razorpay)",
              paymentId: response.razorpay_payment_id,
              orderStatus: "Paid"
            };
            
            // Send confirmation email
            await sendOrderConfirmationEmail(
              formData.email,
              orderData,
              {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                apartment: formData.apartment,
                city: formData.townCity,
                country: formData.country
              }
            );
            
            // Increment order number for next purchase
            incrementOrderNumber();
            
            // Reset loading states before navigation
            setIsSubmitting(false);
            setIsProcessingOrder(false);
            
            // Navigate to thank you page with order data
            navigate('/thank-you', { state: { orderData } });
            
          } catch (error) {
            console.error("Order submission error:", error);
            setFormErrors(prev => ({
              ...prev,
              submit: "Payment successful but failed to send order details. Please contact support."
            }));
            setIsSubmitting(false);
            setIsProcessingOrder(false);
          }
        },
        modal: {
          ondismiss: function () {
            console.log('Razorpay modal dismissed');
            
            // Send abandoned cart email if user closes payment modal
            if (formData.email) {
              sendAbandonedOrderEmail(
                formData.email,
                {
                  orderNumber: orderNumber,
                  productName: orderDetails.productName,
                  quantity: orderDetails.quantity,
                  totalAmount: convertedAmount,
                  currency: currentCurrency.symbol
                },
                {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  phone: formData.phone,
                  address: formData.streetAddress,
                  apartment: formData.apartment,
                  city: formData.townCity,
                  country: formData.country
                }
              );
            }
            
            // Reset loading states when modal is dismissed
            setIsSubmitting(false);
            setIsProcessingOrder(false);
          },
          escape: false,
          backdropclose: false
        },
        theme: {
          color: '#4169E1'
        }
      };
      
      // Open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      console.log("Razorpay modal opened");
      
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

  // Handle form submission with integrated email and payment functionality
  const handleSubmit = (e) => {
    // Set loading state immediately for visual feedback
    setIsSubmitting(true);
    setIsProcessingOrder(true);
    
    // Small delay to ensure UI updates before heavy processing
    setTimeout(() => {
      e.preventDefault();
      const errors = validateForm(formData, translations);
      
      if (Object.keys(errors).length > 0) {
        // If there are errors, show them but stop loading
        setFormErrors(errors);
        setIsSubmitting(false);
        setIsProcessingOrder(false);
        return;
      }

      try {
        if (formData.paymentMode === 'online') {
          // Handle online payment with Razorpay
          handleRazorpayPayment();
          // Don't reset loading states here - they'll be handled in the Razorpay callbacks
        } else if (formData.paymentMode === 'cod') {
          // For COD, continue as normal
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

          // Send form to FormSubmit for processing
          fetch('https://formsubmit.co/ajax/israelitesshopping171@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(formattedData)
          })
            .then(response => response.json())
            .then(result => {
              console.log('Order submission result:', result);
              if (result.success) {
                // Send confirmation email through our API
                sendOrderConfirmationEmail(
                  formData.email,
                  {
                    orderNumber: orderNumber,
                    orderDate: new Date().toISOString(),
                    productName: orderDetails.productName,
                    quantity: orderDetails.quantity,
                    totalAmount: convertedAmount,
                    currency: currentCurrency.symbol,
                    paymentMethod: "Cash on Delivery",
                    orderStatus: "Pending"
                  },
                  {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.streetAddress,
                    apartment: formData.apartment,
                    city: formData.townCity,
                    country: formData.country
                  }
                );
                
                incrementOrderNumber();
                
                // Create order data to pass to thank you page
                const orderData = {
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
                
                // Reset loading states
                setIsProcessingOrder(false);
                setIsSubmitting(false);
                
                // Navigate to thank you page with order data
                navigate('/thank-you', { state: { orderData } });
              } else {
                throw new Error('Order submission failed');
              }
            })
            .catch(error => {
              console.error('Order processing error:', error);
              setFormErrors(prev => ({
                ...prev,
                submit: error.message || 'Failed to process order. Please try again.'
              }));
              setIsProcessingOrder(false);
              setIsSubmitting(false);
            });
        }
      } catch (error) {
        console.error('Order processing error:', error);
        setFormErrors(prev => ({
          ...prev,
          submit: error.message || 'Failed to process order. Please try again.'
        }));
        setIsProcessingOrder(false);
        setIsSubmitting(false);
      }
    }, 50);
  };

  // Handle input changes
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

  // Render form fields
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

  // Render order summary
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
              {currentCurrency?.symbol || '₹'} {((originalPrice * orderDetails?.quantity * (currentCurrency?.rate || 1))).toFixed(2)}
            </span>
            <span className="block font-medium text-gray-900">
              {currentCurrency?.symbol || '₹'} {convertedAmount || 0}
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
          {currentCurrency?.symbol || '₹'} {convertedAmount || 0}
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
            Enjoy a 15% discount when you prepay online! ✨
          </p>
        </div>
      </div>

      {/* Submit Button with Enhanced Styling - Improved Loading State */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting || isProcessingOrder}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-4 px-6 rounded-xl
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        aria-busy={isSubmitting || isProcessingOrder}
      >
        {(isSubmitting || isProcessingOrder) ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {formData.paymentMode === 'online' ? (translations?.checkout?.preparingPayment || 'Preparing Payment...') : (translations?.checkout?.processing || 'Processing...')}
          </div>
        ) : (
          translations?.checkout?.order || 'Place Order'
        )}
      </button>

      {formErrors.submit && (
        <p className="mt-3 text-red-500 text-sm text-center">
          {formErrors.submit}
        </p>
      )}
    </div>
  );

  // Loading while fetching order details
  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Loading overlay during order processing
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
      
      {/* Audio Element for Ring Sound with enhanced compatibility attributes */}
      <audio 
        ref={audioRef} 
        src={ringSound} 
        loop 
        preload="auto"
        playsInline  // Important for iOS
        muted={false}
      />
      
      {/* Auto-call notification */}
      {showCallNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">Calling 9908030444...</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="text-black">        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-yellow-100 via-red-100 to-yellow-100 py-6 px-4 rounded-lg shadow-md">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-24 pl-5"/>

          {/* Title */}
          <h1 className="text-center text-4xl md:text-6xl font-bold text-red-700 drop-shadow-sm">
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
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="flex items-center gap-1">
              <span className="font-semibold">Subscription</span>
            </span>
          </a>
        </div>

        {/* Call Button with improved interaction for sound */}
        <div className="mb-8 mt-5 flex justify-center">
          <a 
            href="tel:+919908030444" 
            onClick={() => {
              handleCallClick();
              attemptPlaySound(); // Try to enable sound when user interacts with call button
            }}
            className={`flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-5 px-8 rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-2xl ${isRinging ? 'animate-call-button' : 'pulse-animation'}`}
          >
            <svg className={`w-10 h-10 ${isRinging ? 'animate-call-icon' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now: 9908030444
          </a>
        </div>              
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto pb-12">
        {/* Product Section */}
        <div className='flex flex-col md:flex-row items-start gap-8 mb-12'>
          <div className="w-full bg-gradient-to-br from-white via-white to-blue-50 bg-opacity-70 backdrop-blur-lg p-6 border border-white border-opacity-20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="mb-8 w-full">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Images Section */}                <div className="md:w-1/2 space-y-6">
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
                      </div>

                      {/* Rating Stars - Fixed JSX */}                        <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className="w-5 h-5 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">(152 reviews)</span>
                      </div>
                      
                      {/* Removed Price Information Section */}
                      
                      {/* Quantity and Delivery Information */}
                      <div className="mt-6 space-y-6">
                        {/* Direct Call Button */}
                        <a 
                          href="tel:+919908030444"
                          onClick={handleCallClick} 
                          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 text-xl ${isRinging ? 'animate-call-button' : ''}`}
                        >
                          <svg className={`w-6 h-6 ${isRinging ? 'animate-call-icon' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call Now: 9908030444
                        </a>
                        
                        {/* Delivery Information */}
                        <div className="flex gap-3 mt-4">
                          <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-white">
                            <div className="flex items-center text-blue-600 mb-2">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              <span className="font-medium">Make a Call</span>
                            </div>
                            <p className="text-xs text-gray-500">Reach out to us directly for offers and assistance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

        {/* Checkout Grid */}
        {/* <div className="grid lg:grid-cols-2 gap-12">
          {/* Billing Details Section */}
 
        
        {/* Customer Reviews Section */}
        <section className="mt-20 mb-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their experience with Sree Anjaneya Shani Raksha
            </p>
          </div>

          {/* Reviews Carousel */}
          <Swiper
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
            {CUSTOMER_REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {review.date} • {review.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.538 1.118l-3.361-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.025 9.374c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.947z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(152 reviews)</span>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-700 mb-4">
                      "{review.content}"
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified Purchase
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

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

export default Landing;