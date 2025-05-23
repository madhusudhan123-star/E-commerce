import React, { useState, useEffect } from 'react';
import product from '../assets/product.jpg';
import product1 from '../assets/product.jpg';  // Ensure these files exist
import product2 from '../assets/product.jpg';  // Ensure these files exist

// Move translations here and simplify
const translations = {
    checkout: {
        title: "Order Now",
        shippingTitle: "Shipping Information",
        orderSummary: {
            subtotal: "Subtotal",
            shipping: "Shipping",
            total: "Total"
        },
        formFields: {
            firstName: {
                label: "First Name",
                placeholder: "Enter your first name",
                error: "First name is required"
            },
            lastName: {
                label: "Last Name",
                placeholder: "Enter your last name",
                error: "Last name is required"
            },
            email: {
                label: "Email",
                placeholder: "Enter your email",
                error: "Please enter a valid email"
            },
            phone: {
                label: "Phone",
                placeholder: "Enter your phone number",
                error: "Please enter a valid 10-digit phone number"
            },
            address: {
                label: "Address",
                placeholder: "Enter your address",
                error: "Address is required"
            },
            city: {
                label: "City",
                placeholder: "Enter your city",
                error: "City is required"
            },
            country: {
                label: "Country",
                placeholder: "Select your country",
                error: "Country is required"
            }
        },
        successMessage: {
            title: "Payment Successful!",
            description: "Thank you for your purchase. Your order has been confirmed.",
            buttonText: "Return to Home"
        }
    }
};

const PAYMENT_IMAGES = {
    visa: "/assets/visa.svg",
    mastercard: "/assets/mastercard.svg",
    rupay: "/assets/rupay.svg",
    razorpay: "https://razorpay.com/assets/razorpay-glyph.svg",
    secure: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
    pci: "https://cdn-icons-png.flaticon.com/512/6107/6107137.png",
    ssl: "https://cdn-icons-png.flaticon.com/512/7947/7947657.png"
};

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

const Checkouts = () => {
    // Remove language context usage
    // const { language } = useLanguage();
    // const translations = data[language] || data['ENGLISH'];

    // Keep other state and functionality
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
    const productPrice = 3990; // Discounted price per unit
    const originalPrice = 6990; // Original price per unit
    const productImages = [product, product1, product2, product];
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);


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

        if (Object.keys(errors).length > 0) {
            return; // Exit early if there are validation errors
        }

        setIsProcessingOrder(true);
        setIsSubmitting(true);

        try {
            if (formData.paymentMode === 'online') {
                // Immediately initialize Razorpay
                handleRazorpayPayment();
            } else if (formData.paymentMode === 'cod') {
                await processCODOrder();
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
    };

    // Separate COD order processing
    const processCODOrder = async () => {
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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                incrementOrderNumber();
                setPaymentSuccess(true);
            } else {
                throw new Error('Order submission failed');
            }
        } catch (error) {
            throw new Error(`Failed to process order: ${error.message}`);
        }
    };

    // Optimize Razorpay payment handling
    const handleRazorpayPayment = () => {
        if (!window.Razorpay) {
            setFormErrors(prev => ({
                ...prev,
                submit: "Payment gateway not loaded. Please refresh the page."
            }));
            setIsProcessingOrder(false);
            setIsSubmitting(false);
            return;
        }

        const options = {
            key: 'rzp_live_tGJjXr7rvi6keg',
            amount: Math.round(convertedAmount * 100),
            currency: currentCurrency.currency,
            name: 'Beyond Slim',
            description: `Order for ${orderDetails.productName}`,
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            handler: async function (response) {
                try {
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
                escape: true,
                backdropclose: false
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
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
                        {/* <button
                            // onClick={() => navigate('/')}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 
                                     transition-all duration-300 transform hover:scale-105 animate-slideUp delay-300"
                        >
                            {translations?.checkout?.continue || 'Continue Shopping'}
                        </button> */}
                    </div>
                </div>
            </div>
        );
    }
    const LoadingOverlay = () => (
        isProcessingOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-lg font-semibold text-gray-700">Processing your order...</p>
                        <p className="mt-2 text-sm text-gray-500 text-center">
                            {formData.paymentMode === 'online'
                                ? 'Preparing payment gateway...'
                                : 'Confirming your order details...'}
                        </p>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen mt-28 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <LoadingOverlay />
            {/* Hero Section with Enhanced Design */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        {translations?.checkout?.title || 'Checkout'}
                    </h1>
                    <p className="text-center text-blue-100 max-w-2xl mx-auto">
                        Complete your purchase securely with our trusted payment options
                    </p>
                </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 pb-12">
                {/* Product Selection Section with Glass Morphism */}
                <div className='flex flex-col md:flex-row items-start gap-8 mb-12'>
                    <div className="w-full bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white border-opacity-20">
                        <div className="mb-8 w-full">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Product Images Section - Fixed sizing */}
                                <div className="md:w-1/2 space-y-4">
                                    <div className="aspect-square rounded-lg overflow-hidden">
                                        <img
                                            src={productImages[selectedImage]}
                                            alt="DR. Joints Pain Relief Oil"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    {/* <div className="grid grid-cols-4 gap-1">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`border-2 rounded-lg overflow-hidden h-10 sm:h-12 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                          }`}
                      >
                        <img
                          src={img}
                          alt={`Product view ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div> */}
                                </div>
                                <div className="flex flex-col justify-between md:w-1/2 space-y-6">
                                    {/* Product Title and Description */}
                                    <div className="space-y-6">
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                                Sree Anjaneya Shani Raksha Kavach
                                            </h1>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="line-through text-lg text-red-500">₹{originalPrice}</span>
                                                <span className="text-2xl text-green-600 font-bold">₹{productPrice}</span>
                                            </div>
                                            {/* Quantity Selector */}
                                            <div className="mt-6">
                                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                                    {translations?.productpage?.secondtitle || 'Quantity'}
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center bg-white shadow-md rounded-lg border border-gray-200">
                                                        <button
                                                            type="button"
                                                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xl font-medium rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                        >
                                                            −
                                                        </button>
                                                        <input
                                                            type="number"
                                                            id="quantity"
                                                            min="1"
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                                            className="w-16 px-3 py-2 text-center text-gray-700 font-medium border-x border-gray-200 focus:outline-none"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setQuantity(prev => prev + 1)}
                                                            className="px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xl font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {quantity > 1 && (
                                                        <span className="text-sm text-green-600 font-medium animate-fade-in">
                                                            {quantity} items selected
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="prose prose-sm text-gray-600">
                                            <p className="mb-4">
                                                A powerful spiritual protection amulet combining the divine energies of Lord Hanuman and Shani Dev.
                                            </p>
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Handcrafted with sacred materials</li>
                                                <li>Blessed with ancient Vedic mantras</li>
                                                <li>Provides protection from negative energies</li>
                                                <li>Helps minimize the effects of Shani Dasha</li>
                                                <li>Perfect for spiritual protection and peace</li>
                                            </ul>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Awards Section removed for now */}

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

export default Checkouts;