import { Navigation, Pagination, Thumbs, FreeMode, Zoom, Autoplay } from 'swiper/modules';
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import product from '../assets/aly5.JPG';
import product1 from '../assets/aly1.jpg';
import product2 from '../assets/aly2.jpg';
import product3 from '../assets/aly3.png';
import product4 from '../assets/aly4.png';
import logo from '../assets/logo.png';
import data from '../assets/data';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css';
import '../App.css'
import { 
  productSliderStyles, 
  CUSTOMER_REVIEWS, 
  COUNTRY_CURRENCY_MAP, 
  PaymentModeSelector, 
  MobileCallButton,
  validateForm,
  handleSubmit as paymentHandleSubmit,
  handleRazorpayPayment as paymentHandleRazorpayPayment
} from '../utils/payment_two';
import ringSound from '../assets/phone-ring.mp3'; // You'll need to add this audio file to your assets folder

// Insert the styles into the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = productSliderStyles;
  document.head.appendChild(styleElement);
}

// Backend URL
const url = "https://razorpaybackend-wgbh.onrender.com";

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

const Aly = () => {
  const navigate = useNavigate();
  const shippingInfoRef = useRef(null);
  const { language } = useLanguage();
  const translations = data[language] || data['ENGLISH']; 
  const [orderDetails, setOrderDetails] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY || { currency: 'INR', symbol: '₹', rate: 1 });
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);  const [orderNumber, setOrderNumber] = useState(1); // Initial order number
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const productPrice = 3990; // Discounted price per unit
  const originalPrice = 6990; // Original price per unit
  const productImages = [product, product1, product2, product3, product4, ];
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const audioRef = useRef(null);
  const [isRinging, setIsRinging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const scrollToShippingInfo = () => {
    shippingInfoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
      productName: 'Sree Astha Laxmi Dhana Akarsha Yantra',
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
      setCurrentCurrency(foundCurrency);
      let baseAmount = orderDetails.totalAmount; // Total amount in INR
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
        name: 'Sree Astha Laxmi',
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

  // Render form fields with trendy styling
  const renderFormField = (name, label, type = "text", required = true) => (
    <div className="mb-5 transform transition-all duration-300 hover:translate-y-[-2px]">
      <label className="block text-sm font-medium text-indigo-700 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full px-4 py-3.5 rounded-xl border bg-white/60 backdrop-blur-sm ${
            formErrors[name] 
              ? 'border-rose-300 ring-2 ring-rose-100 focus:border-rose-500 focus:ring-rose-200' 
              : 'border-gray-200 group-hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
          } transition-all duration-200 focus:outline-none shadow-sm group-hover:shadow-md`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {formErrors[name] && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {!formErrors[name] && formData[name] && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {formErrors[name] && (
        <p className="mt-1.5 text-rose-500 text-sm flex items-center">
          <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
          {formErrors[name]}
        </p>
      )}
    </div>
  );

  // Render order summary with modernized styling
  const renderOrderSummary = () => (
    <div className="space-y-6">
      {/* Product Details Card - Modernized */}
      <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200/70">
          <h3 className="text-lg font-medium text-gray-800">{translations?.checkout?.product || 'Product'}</h3>
          <h3 className="text-lg font-medium text-gray-800">{translations?.checkout?.subtotal || 'Subtotal'}</h3>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={product} alt="Product" className="w-full h-full object-cover"/>
            </div>
            <div>
              <span className="text-gray-800 font-medium block mb-1">{orderDetails?.productName}</span>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                  x{orderDetails?.quantity}
                </span>
                <span className="text-sm text-gray-500">
                  {currentCurrency?.symbol || '₹'}{productPrice} each
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="line-through text-gray-400 text-sm block">
              {currentCurrency?.symbol || '₹'} {((originalPrice * orderDetails?.quantity * (currentCurrency?.rate || 1))).toFixed(2)}
            </span>
            <span className="font-bold text-indigo-700 text-lg">
              {currentCurrency?.symbol || '₹'} {convertedAmount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Info - Modern Card */}
      <div className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-medium text-gray-700">{translations?.checkout?.shipping || 'Shipping'}</span>
        </div>
        <div className="text-right">
          <span className="text-emerald-600 font-bold">Free</span>
          <span className="block text-sm text-gray-500">Delivery within 5-7 business days</span>
        </div>
      </div>

      {/* Total Amount - Clean Design */}
      <div className="flex justify-between items-center py-4 px-2">
        <span className="text-xl font-bold text-gray-800">{translations?.checkout?.total || 'Total'}</span>
        <span className="text-2xl font-bold text-indigo-600">
          {currentCurrency?.symbol || '₹'} {convertedAmount || 0}
        </span>
      </div>

      {/* Payment Mode Selection - Card Selector */}
      <div className="mt-6">
        <label className="block text-base font-medium text-gray-700 mb-3">
          {translations?.checkout?.mode || 'Payment Mode'}<span className="text-rose-500">*</span>
        </label>
        <div className="space-y-3">
          <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${formData.paymentMode === 'online' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white'}`}>
            <input
              type="radio"
              name="paymentMode"
              value="online"
              checked={formData.paymentMode === 'online'}
              onChange={(e) => handleInputChange({ target: { name: 'paymentMode', value: e.target.value } })}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border flex-shrink-0 ${formData.paymentMode === 'online' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'} mr-3`}>
              {formData.paymentMode === 'online' && (
                <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-1">
              <span className="font-medium text-gray-900 block">Pay Securely Online</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-green-600 font-medium">15% off</span>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <svg className="h-5 w-5 text-gray-400 -ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </label>

          <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${formData.paymentMode === 'cod' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white'}`}>
            <input
              type="radio"
              name="paymentMode"
              value="cod"
              checked={formData.paymentMode === 'cod'}
              onChange={(e) => handleInputChange({ target: { name: 'paymentMode', value: e.target.value } })}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border flex-shrink-0 ${formData.paymentMode === 'cod' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'} mr-3`}>
              {formData.paymentMode === 'cod' && (
                <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-1">
              <span className="font-medium text-gray-900 block">Cash on Delivery (COD)</span>
              <div className="flex items-center mt-0.5">
                <svg className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-500">Pay when you receive</span>
              </div>
            </div>
          </label>
        </div>
        {formErrors.paymentMode && (
          <p className="text-rose-500 text-sm mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {formErrors.paymentMode}
          </p>
        )}
      </div>
      
      {/* Discount Banner - Modern with Pulse Effect */}
      <div className="mt-6 relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-0.5 rounded-2xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 opacity-30 blur-xl group-hover:opacity-40 transition-all duration-300"></div>
        <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-[14px] overflow-hidden">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <p className="text-white font-bold text-xl">
                15% OFF on Online Payment
              </p>
              <p className="text-white/80 text-sm">
                Secure, instant, and convenient payment!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button with Enhanced Styling and Animation */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting || isProcessingOrder}
        className="group relative w-full mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium py-4 px-6 rounded-xl
                   shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        aria-busy={isSubmitting || isProcessingOrder}
      >
        {/* Background animation effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:opacity-90"></span>
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-900 ease-in-out"></span>
        
        {/* Content */}
        <span className="relative flex items-center justify-center">
          {(isSubmitting || isProcessingOrder) ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {formData.paymentMode === 'online' ? (translations?.checkout?.preparingPayment || 'Preparing Payment...') : (translations?.checkout?.processing || 'Processing...')}
            </div>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {translations?.checkout?.order || 'Complete Purchase'}
            </>
          )}
        </span>
      </button>

      {formErrors.submit && (
        <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm p-4 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{formErrors.submit}</span>
          </div>
        </div>
      )}
    </div>
  );

  // Setup the ringing effect after page load - move this useEffect higher up alongside other useEffects
  // This ensures it's not called conditionally
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRinging(true);
      if (audioRef.current && !hasInteracted) {
        audioRef.current.play().catch(error => {
          // Browser may block autoplay without user interaction
          console.log('Autoplay prevented:', error);
        });
      }
    }, 5000);

    // Handle user interaction to enable audio
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  // Stop ringing when user interacts with the call button
  const handleCallClick = () => {
    setIsRinging(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Loading while fetching order details - Glass morphism style
  if (!orderDetails) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-100 border-b-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-transparent border-t-violet-400 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-700 font-medium">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Loading overlay during order processing - Modern glass style
  const LoadingOverlay = () => (
    isProcessingOrder && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="relative bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-violet-100 rounded-full blur-3xl opacity-70"></div>
          <div className="relative">
            <div className="w-20 h-20 mx-auto border-[5px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-8 text-gray-800 text-center font-bold text-xl">Processing your order...</p>
            <p className="mt-3 text-gray-500 text-center">Please don't close this window</p>
            
            <div className="mt-6 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse-width"></div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <LoadingOverlay />
      <MobileCallButton />
      
      {/* Audio Element for Ring Sound */}
      <audio ref={audioRef} src={ringSound} loop />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">        
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-24"/>

          {/* Title */}
          <h1 className="text-center text-3xl md:text-5xl font-bold drop-shadow-md">
            Sree Astha Laxmi Dhana Akarsha Yantra
          </h1>

          {/* YouTube Subscribe Button */}
          <a 
            href="https://www.youtube.com/channel/UCvVPuK65Uhb_ts8qT4t0CWQ?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white text-indigo-700 font-medium py-2.5 px-5 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            aria-label="Subscribe to our YouTube channel"
          >
            <svg className="w-5 h-5 fill-current text-red-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="flex items-center gap-1">
              <span className="font-semibold">Subscribe Now</span>
            </span>
          </a>
        </div>

        {/* Call Button */}
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <a 
              href="tel:+919908030444" 
              onClick={handleCallClick}
              className={`flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 text-xl mx-auto max-w-md w-full ${isRinging ? 'animate-call-button' : 'pulse-animation'}`}
            >
              <svg className={`w-8 h-8 ${isRinging ? 'animate-call-icon' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: 9908030444
            </a>
          </div>
        </div>              
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Product Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className='flex flex-col md:flex-row'>
            {/* Product Images Section */}
            <div className="md:w-1/2 p-6 bg-gradient-to-br from-gray-50 to-indigo-50">
              {/* Main Product Slider */}
              <div className="product-slider rounded-2xl overflow-hidden shadow-lg">
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
                  className="main-product-swiper rounded-2xl"
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
                        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium transform rotate-[-5deg] shadow-lg">
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
              <div className="mt-4">
                <Swiper
                  modules={[Thumbs, FreeMode]}
                  watchSlidesProgress
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  onSwiper={setThumbsSwiper}
                  className="thumbs-swiper"
                >
                  {productImages.map((img, index) => (
                    <SwiperSlide key={index} className="cursor-pointer rounded-lg overflow-hidden">
                      <div className="border-2 border-transparent hover:border-indigo-500 transition-all duration-200 h-20">
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              
              {/* Image Feature Pills */}
              <div className="flex flex-wrap gap-2 justify-center mt-6">
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
            </div>
            
            <div className="md:w-1/2 p-8">
              {/* Product Title and Description */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Sree Astha Laxmi Dhana Akarsha Yantra
                    </h1>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> In Stock
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
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
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(152 reviews)</span>
                  </div>
                  
                  {/* Price Information */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="line-through text-lg text-gray-400">₹{originalPrice}</span>
                    <span className="text-3xl text-indigo-600 font-bold">₹{productPrice}</span>
                    <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded-md font-medium">
                      {Math.round((originalPrice - productPrice) / originalPrice * 100)}% OFF
                    </span>
                  </div>
                  
                  {/* Product Description */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="block text-lg font-semibold text-indigo-700 mb-2">Ancient Prosperity Symbol</span>
                      Sree Astha Laxmi Dhana Akarsha Yantra - A powerful sacred geometry designed to attract wealth and prosperity. This divine yantra embodies the blessings of Goddess Lakshmi and channels cosmic energies to remove financial obstacles and invite abundance into your life and home.
                    </p>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                        {translations?.productpage?.secondtitle || 'Quantity'}
                      </label>
                      <span className="text-xs text-indigo-600 font-medium">
                        {quantity > 10 ? 'Bulk discount available!' : 'Buy more, save more!'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          className="px-4 py-3 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 transition-all duration-200 text-xl font-medium focus:outline-none"
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
                          className="px-4 py-3 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 transition-all duration-200 text-xl font-medium focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      {quantity > 1 && (
                        <div className="text-sm bg-indigo-50 text-indigo-700 font-medium px-3 py-1 rounded-full animate-fade-in flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {quantity} items selected
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 mt-6">
                    <button
                      onClick={scrollToShippingInfo}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Buy Now
                    </button>
                    
                    <a 
                      href="tel:+919908030444" 
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-3 px-6 rounded-xl shadow hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now: 9908030444
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Sacred Benefits */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sacred Benefits:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Attracts wealth and prosperity</span>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Energized with Vedic mantras</span>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Removes financial obstacles</span>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Enhances business growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guarantee and Trust Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
            <div className="flex flex-wrap justify-center gap-6">
              {/* Authenticity Badge */}
              <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-sm min-w-[200px]">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-indigo-800">100% Authentic</h3>
                <p className="text-sm text-indigo-600 mt-1">Genuine sacred yantra with blessings</p>
              </div>

              {/* Satisfaction Badge */}
              <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-sm min-w-[200px]">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-green-800">Satisfaction Guaranteed</h3>
                <p className="text-sm text-green-600 mt-1">Experience divine blessings or full refund</p>
              </div>
              
              {/* Support Badge */}
              <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-sm min-w-[200px]">
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

        {/* Checkout Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Billing Details Section */}
          <div>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-indigo-50 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-50 blur-2xl"></div>
              
              {/* Section header with animation */}
              <div className="relative z-10 mb-8 border-b border-indigo-100 pb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg mr-4 transform transition-transform duration-500 hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      {translations?.checkout?.sectitle || 'Shipping Information'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Fill in your details for a smooth delivery</p>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-6 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-3/5"></div>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Personal Information Section */}
                <div>
                                   <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {renderFormField("firstName", translations?.checkout?.firstname || 'First Name')}
                    {renderFormField("lastName", translations?.checkout?.lastname || 'Last Name')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {renderFormField("phone", translations?.checkout?.phone || 'Phone', "tel")}
                    {renderFormField("email", translations?.checkout?.email || 'Email', "email")}
                  </div>
                </div>
                
                {/* Divider with icon */}
                <div className="flex items-center my-8">
                  <div className="flex-grow h-0.5 bg-gray-100"></div>
                  <div className="flex-shrink-0 mx-4 p-2 rounded-full bg-indigo-50">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow h-0.5 bg-gray-100"></div>
                </div>
                
                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Delivery Address
                  </h3>

                  {/* Country Dropdown */}
                  <div className="space-y-2 mb-5 transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label className="block text-sm font-medium text-indigo-700 mb-1.5">
                      {translations?.checkout?.country || 'Country'}<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 appearance-none bg-white/60 backdrop-blur-sm transition-all duration-200 shadow-sm group-hover:shadow-md group-hover:border-indigo-300"
                      >
                        {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                          <option key={country} value={country}>
                            {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-indigo-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address fields */}
                  {renderFormField("streetAddress", translations?.checkout?.address || 'Street Address')}
                  {renderFormField("apartment", translations?.checkout?.clientaddress || 'Apartment, suite, etc.', "text", false)}
                  {renderFormField("townCity", translations?.checkout?.city || 'Town/City')}
                </div>
                
                {/* Secure information badge */}
                <div className="flex items-center justify-center bg-green-50 p-4 rounded-xl border border-green-100 mt-8">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-green-700">Your information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Summary
              </h2>
              {renderOrderSummary()}
            </div>
          </div>
        </div>
        
        {/* Customer Reviews Section */}
        <section className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
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
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
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
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.538 1.118l-3.361-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.538-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.025 9.374c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.947z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(152 reviews)</span>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-700 mb-4 italic">
                      "{review.content}"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
};

export default Aly;

